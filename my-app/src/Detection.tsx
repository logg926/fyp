import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
// import { dummyimg } from "./dummyimg";
import { DropzoneAreaPhoto, DropzoneAreaVideo } from "./DropZone";
import { postData } from "./dataservice";
import { Card, Box, Button } from "@material-ui/core";
import { useUserContext } from "./userContext";

declare let cv: any;
export const Detection = observer(() => {
  const state = useUserContext();
  const [dresult, setDresult] = React.useState(0);
  


  // const readImage = () => {
  // let aa = cv.imread(state.photoFile, 0);
  // console.log("aa:");
  // let canvas = document.getElementById("canvasOutput");
  // let ctx = canvas.getContext('2d');
  // let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // let src = cv.matFromImageData(imgData);
  // let dst = new cv.Mat();
  // cv.cvtColor(mat, dst, cv.COLOR_RGBA2GRAY);
  // cv.imshow('canvasOutput', dst);
  // }

  let imgElement = document.getElementById("imageSrc") as HTMLVideoElement
  imgElement && (imgElement.src = state.photoFile);
  // const { detectimg } = dummyimg;
  // console.log(detectimg);
  const img = {
    detectimg: [],
  };
  console.log(state.photoFile)

  const processVideo = (() => {
    let FPS = 30;
    let begin = Date.now();
    let cap = new cv.VideoCapture(imgElement);
    let mat = new cv.Mat(400, 400, cv.CV_8UC4);
    let src = new cv.Mat(400, 400, cv.CV_8UC1);
    cap.read(mat);
    cv.cvtColor(mat, src, cv.COLOR_RGBA2RGB);
    cv.imshow("canvasOutput", src);
    // schedule next one.
    // let delay = 1000/FPS - (Date.now() - begin);
    // setTimeout(processVideo, 3000);
    // cv.imshow('canvasOutput', mat);
    // console.log(mat);
    let dst = new cv.Mat();
    src.convertTo(dst, cv.CV_8U);
    console.log(dst);
    let arrOut: any = [];
    for (let i = 0; i < dst.rows; ++i) {
      arrOut[i] = []
      for (let j = 0; j < dst.cols; ++j) {
        arrOut[i][j] = dst.ucharAt(i, j);
      }
    };
    console.log(arrOut);
    img.detectimg = arrOut;
    console.log(img)
    // console.log(detectimg)
    // console.log(arrOut);
    // cv.imshow("canvasOutput", mat)
    // console.log(arrOut[0])
    // console.log(detectimg)
    // console.log(dst.data)
    mat.delete();
    src.delete();
  })

  imgElement && (imgElement.onloadstart = function () {
    console.log("image loaded!")
    setTimeout(processVideo,200);
  });




  // useEffect(() => {

    // cv["onRuntimeInitialized"] = () => {
    // do all your work here
    // const { detectimg } = dummyimg;
    // console.log(detectimg);



    // console.log(arrOut[0])


    // const out: any = [];
    // let newArr: any = [];

    // for (var i = 0; i < detectimg.length; i++) {
    //   newArr = newArr.concat(detectimg[i]);
    // }
    // // Fourier.transform(detectimg, out)
    // // const img  = new cv.Mat()
    // const src = cv.matFromArray(
    //   detectimg.length,
    //   detectimg[0].length,
    //   cv.CV_8UC1,
    //   newArr
    // );

    // console.log(src.data)
    // // let img = cv.matFromArray(2, 2, cv.CV_8UC1, [
    // //   [1, 2],
    // //   [3, 4],
    // // ]);
    // // cv.dft(img,img)
    // // const afterfft =
    // // console.log(img);

    // let optimalRows = cv.getOptimalDFTSize(src.rows);
    // let optimalCols = cv.getOptimalDFTSize(src.cols);
    // let s0 = cv.Scalar.all(0);
    // let padded = new cv.Mat();
    // cv.copyMakeBorder(
    //   src,
    //   padded,
    //   0,
    //   optimalRows - src.rows,
    //   0,
    //   optimalCols - src.cols,
    //   cv.BORDER_CONSTANT,
    //   s0
    // );

    // // use cv.MatVector to distribute space for real part and imaginary part
    // let plane0 = new cv.Mat();
    // padded.convertTo(plane0, cv.CV_32F);
    // let planes = new cv.MatVector();
    // let complexI = new cv.Mat();
    // let plane1 = new cv.Mat.zeros(padded.rows, padded.cols, cv.CV_32F);
    // planes.push_back(plane0);
    // planes.push_back(plane1);
    // cv.merge(planes, complexI);

    // // in-place dft transform
    // console.log(complexI.data)
    // cv.dft(complexI, complexI, cv.DFT_COMPLEX_OUTPUT);

    // // compute log(1 + sqrt(Re(DFT(img))**2 + Im(DFT(img))**2))
    // cv.split(complexI, planes);
    // cv.magnitude(planes.get(0), planes.get(1), planes.get(0));
    // let mag = planes.get(0);
    // let m1 = new cv.Mat.ones(mag.rows, mag.cols, mag.type());
    // cv.add(mag, m1, mag);
    // cv.log(mag, mag);

    // // crop the spectrum, if it has an odd number of rows or columns
    // let rect = new cv.Rect(0, 0, mag.cols & -2, mag.rows & -2);
    // mag = mag.roi(rect);

    // // rearrange the quadrants of Fourier image
    // // so that the origin is at the image center
    // let cx = mag.cols / 2;
    // let cy = mag.rows / 2;
    // let tmp = new cv.Mat();

    // let rect0 = new cv.Rect(0, 0, cx, cy);
    // let rect1 = new cv.Rect(cx, 0, cx, cy);
    // let rect2 = new cv.Rect(0, cy, cx, cy);
    // let rect3 = new cv.Rect(cx, cy, cx, cy);

    // let q0 = mag.roi(rect0);
    // let q1 = mag.roi(rect1);
    // let q2 = mag.roi(rect2);
    // let q3 = mag.roi(rect3);

    // // exchange 1 and 4 quadrants
    // q0.copyTo(tmp);
    // q3.copyTo(q0);
    // tmp.copyTo(q3);

    // // exchange 2 and 3 quadrants
    // q1.copyTo(tmp);
    // q2.copyTo(q1);
    // tmp.copyTo(q2);

    // // The pixel value of cv.CV_32S type image ranges from 0 to 1.
    // cv.normalize(mag, mag, 0, 1, cv.NORM_MINMAX);


    // cv.imshow("canvasOutput", mag);

    // src.delete();
    // padded.delete();
    // planes.delete();
    // complexI.delete();
    // m1.delete();
    // tmp.delete();
    // };
    // console.log(nj.fft(detectimg))
    // let b = imread()
    // console.log()
  // }, []);
  return <>
    <Card raised>
      Put your Video here:
      <Box>
        <DropzoneAreaPhoto />
      </Box>
      <h2>Preview:</h2>
      <video id="imageSrc"  width="400" height="400" autoPlay/>
    </Card>
    <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            postData('http://localhost:8000/svm_test', img)
              .then(data => {
                setDresult(parseInt(data[1]));
                console.log(data[1]) // JSON data parsed by `data.json()` call
              })
            console.log("detection made")
          }}
        >
          Detect
        </Button>
    </Box>
    <h1 id = "result">{dresult ? "It is a deepfake" : "It is not a deepfake"}</h1>
    
    <canvas id="canvasOutput" width="300" height="300"></canvas>
  </>;
});
