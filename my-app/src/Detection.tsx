import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { dummyimg } from "./dummyimg";

const nj = require("numjs");

declare let cv: any;
export const Detection = observer(() => {
  useEffect(() => {
    // cv["onRuntimeInitialized"] = () => {
      // do all your work here
      const { detectimg } = dummyimg;
      console.log(detectimg);
      const out: any = [];
      let newArr: any = [];

      for (var i = 0; i < detectimg.length; i++) {
        newArr = newArr.concat(detectimg[i]);
      }
      // Fourier.transform(detectimg, out)
      // const img  = new cv.Mat()
      const src = cv.matFromArray(
        detectimg.length,
        detectimg[0].length,
        cv.CV_8UC1,
        newArr
      );

      console.log(src.data)
      // let img = cv.matFromArray(2, 2, cv.CV_8UC1, [
      //   [1, 2],
      //   [3, 4],
      // ]);
      // cv.dft(img,img)
      // const afterfft =
      // console.log(img);

      let optimalRows = cv.getOptimalDFTSize(src.rows);
      let optimalCols = cv.getOptimalDFTSize(src.cols);
      let s0 = cv.Scalar.all(0);
      let padded = new cv.Mat();
      cv.copyMakeBorder(
        src,
        padded,
        0,
        optimalRows - src.rows,
        0,
        optimalCols - src.cols,
        cv.BORDER_CONSTANT,
        s0
      );

      // use cv.MatVector to distribute space for real part and imaginary part
      let plane0 = new cv.Mat();
      padded.convertTo(plane0, cv.CV_32F);
      let planes = new cv.MatVector();
      let complexI = new cv.Mat();
      let plane1 = new cv.Mat.zeros(padded.rows, padded.cols, cv.CV_32F);
      planes.push_back(plane0);
      planes.push_back(plane1);
      cv.merge(planes, complexI);

      // in-place dft transform
      console.log(complexI.data)
      cv.dft(complexI, complexI, cv.DFT_COMPLEX_OUTPUT);

      // compute log(1 + sqrt(Re(DFT(img))**2 + Im(DFT(img))**2))
      cv.split(complexI, planes);
      cv.magnitude(planes.get(0), planes.get(1), planes.get(0));
      let mag = planes.get(0);
      let m1 = new cv.Mat.ones(mag.rows, mag.cols, mag.type());
      cv.add(mag, m1, mag);
      cv.log(mag, mag);

      // crop the spectrum, if it has an odd number of rows or columns
      let rect = new cv.Rect(0, 0, mag.cols & -2, mag.rows & -2);
      mag = mag.roi(rect);

      // rearrange the quadrants of Fourier image
      // so that the origin is at the image center
      let cx = mag.cols / 2;
      let cy = mag.rows / 2;
      let tmp = new cv.Mat();

      let rect0 = new cv.Rect(0, 0, cx, cy);
      let rect1 = new cv.Rect(cx, 0, cx, cy);
      let rect2 = new cv.Rect(0, cy, cx, cy);
      let rect3 = new cv.Rect(cx, cy, cx, cy);

      let q0 = mag.roi(rect0);
      let q1 = mag.roi(rect1);
      let q2 = mag.roi(rect2);
      let q3 = mag.roi(rect3);

      // exchange 1 and 4 quadrants
      q0.copyTo(tmp);
      q3.copyTo(q0);
      tmp.copyTo(q3);

      // exchange 2 and 3 quadrants
      q1.copyTo(tmp);
      q2.copyTo(q1);
      tmp.copyTo(q2);

      // The pixel value of cv.CV_32S type image ranges from 0 to 1.
      cv.normalize(mag, mag, 0, 1, cv.NORM_MINMAX);


      cv.imshow("canvasOutput", mag);
      src.delete();
      padded.delete();
      planes.delete();
      complexI.delete();
      m1.delete();
      tmp.delete();
    // };
    // console.log(nj.fft(detectimg))
  }, []);
  return <canvas id="canvasOutput" width="300" height="300"></canvas>;
});
