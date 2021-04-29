import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
// import { dummyimg } from "./dummyimg";
import { DropzoneAreaPhoto, DropzoneAreaVideo } from "./DropZone";
import { postData } from "./dataservice";
import { Card, Box, Button, Grid } from "@material-ui/core";
import { useUserContext } from "./userContext";

declare let cv: any;
export const Detection = observer(() => {
  const state = useUserContext();
  const [svmresult, setSvmresult] = React.useState(-1);
  const [capresult, setCapresult] = React.useState(-1);
  const [cnnresult, setCnnresult] = React.useState(-1);
  const [ensresult, setEnsresult] = React.useState(-1);



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

  // if(!state.videoFile){
  //   setSvmresult(-1);
  //   setCapresult(-1);
  //   setCnnresult(-1);
  //   setEnsresult(-1);
  // }

  let vidElement = document.getElementById("videoSrc") as HTMLVideoElement
  // let imgElement = document.getElementById("imageSrc") as HTMLImageElement
  vidElement && (vidElement.src = state.videoFile);
  let duration: number;
  vidElement && (vidElement.onloadedmetadata = function () {
    console.log('metadata loaded!');
    duration = vidElement.duration * 1000;
    videoOnLoad();
  });

  // imgElement && (imgElement.src = state.photoFile);
  const img = {
    detectvid: [] as any,
  };
  const svmimg = {
    detectimg: [] as any,
  };
  console.log(state.photoFile)
  console.log(state.videoFile)

  const FPS = 30;
  // const canvas: any = document.getElementById("canvasOutput");
  // const ctx = canvas.getContext("2d");
  const width = 256;

  let timeLeft = 0;
  const processVideo = (() => {
    console.log("run")
    let begin = Date.now();
    let cap = new cv.VideoCapture(vidElement);
    let mat = new cv.Mat(256, 256, cv.CV_8UC4);
    cap.read(mat);
    // cv.imshow("canvasOutput", mat);
    // schedule next one.
    // let delay = 1000/FPS - (Date.now() - begin);
    // setTimeout(processVideo, 3000);
    // cv.imshow('canvasOutput', mat);
    // console.log(mat);
    // cv.imshow("canvasOutput", mat);

    // const imgData = ctx.getImageData(0, 0, 256, 256).data;
    // console.log(imgData)
    // let dst = new cv.Mat();
    // mat.convertTo(dst, cv.CV_8U);
    // console.log(dst);

    let data_w = []
    const data = []
    let step = 0;
    for (let i = 0; i <= mat.data.length; i += 4) {
      if (step == width) {
        data.push(JSON.parse(JSON.stringify(data_w)))
        // data_svm.push(JSON.parse(JSON.stringify(data_svm_w)))
        // console.log(data_svm_w)
        step = 0;
        data_w = [];
      }
      data_w.push([mat.data[i], mat.data[i + 1], mat.data[i + 2]]);
      // console.log(timeLeft);
      // console.log(data_w)

      ++step;

    }
    // console.log(data)


    img.detectvid.push(data)
    // console.log(svmimg.detectimg)

    // console.log(data)
    // let arrOut: any = [];
    // for (let i = 0; i < dst.rows; ++i) {
    //   arrOut[i] = []
    //   for (let j = 0; j < dst.cols; ++j) {
    //     arrOut[i][j] = dst.ucharAt(i, j);
    //   }
    // };
    // console.log(arrOut);
    // img.detectimg = arrOut;
    // console.log(img)
    // console.log(detectimg)
    // console.log(arrOut);
    // cv.imshow("canvasOutput", mat)
    // console.log(arrOut[0])
    // console.log(detectimg)
    // console.log(dst.data)


    let delay = (Date.now() - begin);
    timeLeft += delay;
    if (timeLeft >= duration) {
      console.log("stop")
      let src = new cv.Mat(256, 256, cv.CV_8UC1);
      cv.cvtColor(mat, src, cv.COLOR_RGBA2GRAY);
      let data_svm_w = []
      let data_svm = [];
      let step_svm = 0;
      for (let i = 0; i <= src.data.length; i++) {
        if (step_svm == width) {
          data_svm.push(JSON.parse(JSON.stringify(data_svm_w)))
          // data_svm.push(JSON.parse(JSON.stringify(data_svm_w)))
          // console.log(data_svm_w)
          step_svm = 0;
          data_svm_w = [];
        }
        // let avg = Math.round((mat.data[i] + mat.data[i + 1] + mat.data[i + 2]) / 3)
        // console.log(avg)
        data_svm_w.push(src.data[i]);
        // console.log(timeLeft);
        // console.log(data_w)

        ++step_svm;

      }
      // console.log(data)
      svmimg.detectimg = data_svm;
      console.log(svmimg)
      console.log(img);
      src.delete();


      // data_svm_w.push(avg)

      return
    }
    mat.delete();
    // console.log(delay)
    setTimeout(processVideo, delay);
    // console.log(img.detectimg)
    // src.delete();
    // dst.delete();
  })

  const videoOnLoad = (() => {
    // if (state.photoFile) {
    //   console.log("remove image to display video");
    //   return
    // }
    console.log("video loaded!")
    setTimeout(processVideo, 0);
    // setTimeout(processVideo, 3000);
    // console.log(img.detectimg)
  });

  // const imgOnLoad = (() => {
  //   if (state.videoFile) {
  //     console.log("remove video to display image");
  //     return
  //   }
  //   console.log("image loaded!")
  //   let mat = cv.imread(imgElement);
  //   cv.imshow('canvasOutput', mat);
  //   console.log(mat);
  //   // let dst = new cv.Mat();
  //   // let rect = new cv.Rect(100, 100, 200, 200);
  //   // console.log(rect)
  //   // let img = cv.matFromImageData(mat);
  //   // console.log(img);
  //   let dst = new cv.Mat();
  //   mat.convertTo(dst, cv.CV_8U);
  //   let arrOut: any = [];
  //   for (let i = 0; i < dst.rows; ++i) {
  //     arrOut[i] = []
  //     for (let j = 0; j < dst.cols; ++j) {
  //       arrOut[i][j] = dst.ucharAt(i, j);
  //     }
  //   };
  //   img.detectimg = arrOut;
  //   console.log(img)
  //   // console.log(detectimg)
  //   // console.log(arrOut);
  //   // cv.imshow("canvasOutput", dst)
  //   // console.log(arrOut[0])
  //   // console.log(detectimg)
  //   // console.log(dst.data)
  //   mat.delete();
  //   dst.delete();
  // });

  return <>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Card>
          <Box height={700} m={1}>
            <h3>Put your Video here:</h3>
            <span>
              {/* <Box>
          <DropzoneAreaPhoto />
        </Box> */}
              <Box>
                <DropzoneAreaVideo />
              </Box>
            </span>

            <h4>Preview:</h4>
            <video id="videoSrc" width="256" height="256" autoPlay />
            {/* <canvas id="canvasOutput" width="256" height="256"></canvas> */}
            {/* <img id="imageSrc" alt="No image" width="400" onLoad={imgOnLoad} /> */}
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <Box height={700} m={1}>
            {/* <h1 id="result">{svmresult ? "It is a deepfake" : "It is not a deepfake"}</h1> */}
            <h1>Detection Report of Deepfakes:</h1>
            <h4>1.Capsule Network Test: </h4>
            <h2>{(capresult == 1) ? 'True' : ((capresult == 0) ? 'False' : '')}</h2>
            <h4>2.Xception Network Test:</h4>
            <h2>{(cnnresult == 1) ? 'True' : ((cnnresult == 0) ? 'False' : '')}</h2>
            <h4>3.Ensemble Network Test:</h4>
            <h2>{(ensresult == 1) ? 'True' : ((ensresult == 0) ? 'False' : '')}</h2>
            <h4>4.Frequency Domain Test:</h4>
            <h2>{(svmresult == 1) ? 'True' : ((svmresult == 0) ? 'False' : '')}</h2>
          </Box>
        </Card>
      </Grid>
    </Grid>
    <Box>
      {svmimg && <Button
        variant="contained"
        color="primary"
        onClick={() => {
          // postData('http://localhost:8000/capsule_test', img)
          //   .then(data => {
          //     setCapresult(parseInt(data[1]));
          //     console.log(data[1]) // JSON data parsed by `data.json()` call
          //   })
          postData('http://localhost:8000/cnn_test', img)
            .then(data => {
              setCnnresult(parseInt(data[1]));
              console.log(data[1]) // JSON data parsed by `data.json()` call
            })
          postData('http://localhost:8000/ensemble_test', img)
            .then(data => {
              setEnsresult(parseInt(data[1]));
              console.log(data[1]) // JSON data parsed by `data.json()` call
            })
          postData('http://localhost:8000/svm_test', svmimg)
            .then(data => {
              setSvmresult(parseInt(data[1]));
              console.log(data[1]) // JSON data parsed by `data.json()` call
            })
        }}
      >
        Detect
        </Button>}
    </Box>


    <canvas id="canvasOutput" width="256" height="256"></canvas>
  </>;
});
