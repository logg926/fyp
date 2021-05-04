import React from "react";
import { observer } from "mobx-react-lite";
import { DropzoneAreaVideo } from "./DropZone";
import { postData } from "./dataservice";
import { Card, Box, Button, Grid } from "@material-ui/core";
import { useUserContext } from "./userContext";
import CircularProgress from "@material-ui/core/CircularProgress";

declare let cv: any;
export const Detection = observer(() => {
  const state = useUserContext();
  let vidElement = document.getElementById("videoSrc") as HTMLVideoElement
  vidElement && (vidElement.src = state.videoFile);
  let duration: number;
  vidElement && (vidElement.onloadedmetadata = function () {
    console.log('metadata loaded!');
    duration = vidElement.duration * 1000;
    videoOnLoad();
  });

  const img = {
    detectvid: [] as any,
  };
  const svmimg = {
    detectimg: [] as any,
  };

  const videoOnLoad = (() => {
    console.log("video loaded!")
    setTimeout(processVideo, 20);
  });
  const width = 256;

  let timeLeft = 0;
  const processVideo = (() => {
    console.log("run")
    let begin = Date.now();
    let cap = new cv.VideoCapture(vidElement);
    let mat = new cv.Mat(256, 256, cv.CV_8UC4);
    cap.read(mat);

    let data_w = []
    const data = []
    let step = 0;
    for (let i = 0; i <= mat.data.length; i += 4) {
      if (step === width) {
        data.push(JSON.parse(JSON.stringify(data_w)))
        step = 0;
        data_w = [];
      }
      data_w.push([mat.data[i], mat.data[i + 1], mat.data[i + 2]]);
      ++step;

    }
    img.detectvid.push(data)

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
        if (step_svm === width) {
          data_svm.push(JSON.parse(JSON.stringify(data_svm_w)))
          step_svm = 0;
          data_svm_w = [];
        }
        data_svm_w.push(src.data[i]);
        ++step_svm;
      }
      svmimg.detectimg = data_svm;
      src.delete();
      return
    }
    mat.delete();
    setTimeout(processVideo, delay);
  })



  return <>
    <Box p={2} alignContent="center">
      <b>Deepfakes Detection</b>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <Box height={700} m={1}>
              Put your Video here:
              <span>
                <Box>
                  <DropzoneAreaVideo />
                </Box>
              </span>

              <h4>Preview:</h4>
              <video id="videoSrc" width="300" height="300" autoPlay />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          {state.videoFile &&
            <Card>
              <Box height={700} m={1}>
                <h1>Detection Report of Deepfakes:</h1>
                <h4>1.Capsule Network Test: </h4>
                <h2>{state.caperror === 1 ? 'Return error' : (state.capresult === 0 ? "It is not a deepfake" : (state.capresult === 1 ? "It is a deepfake" : 'Waiting for response...'))}</h2>
                {state.caploading && <CircularProgress />}
                <h4>2.Xception Network Test:</h4>
                <h2>{state.cnnerror === 1 ? 'Return error' : (state.cnnresult === 0 ? "It is not a deepfake" : (state.cnnresult === 1 ? "It is a deepfake" : 'Waiting for response...'))}</h2>
                {state.cnnloading && <CircularProgress />}
                <h4>3.Ensemble Network Test:</h4>
                <h2>{state.enserror === 1 ? 'Return error' : (state.ensresult === 0 ? "It is not a deepfake" : (state.ensresult === 1 ? "It is a deepfake" : 'Waiting for response...'))}</h2>
                {state.ensloading && <CircularProgress />}
                <h4>4.Frequency Domain Test:</h4>
                <h2>{state.svmerror === 1 ? 'Return error' : (state.svmresult === 0 ? "It is not a deepfake" : (state.svmresult === 1 ? "It is a deepfake" : 'Waiting for response...'))}</h2>
                {state.svmloading && <CircularProgress />}
              </Box>
            </Card>
          }
        </Grid>
      </Grid>
      <Box>
        {<Button
          variant="contained"
          color="primary"
          onClick={() => {
            state.caploading = true;
            state.cnnloading = true;
            state.ensloading = true;
            state.svmloading = true;
            postData('http://localhost:8000/capsule_test', img)
              .then(data => {
                state.capresult = parseFloat(data) > 0.5 ? 1 : 0;
                state.caploading = false;
              }).catch(error => {
                state.caperror = 1;
                state.caploading = false;
              });
            postData('http://localhost:8000/cnn_test', img)
              .then(data => {
                state.cnnresult = parseInt(data[1]);
                state.cnnloading = false;
              }).catch(error => {
                state.cnnerror = 1;
                state.cnnloading = false;
              });
            postData('http://localhost:8000/ensemble_test', img)
              .then(data => {
                state.ensresult = parseInt(data[1]);
                state.ensloading = false;
              }).catch(error => {
                state.enserror = 1;
                state.ensloading = false;
              });
            postData('http://localhost:8000/svm_test', svmimg)
              .then(data => {
                state.svmresult = parseInt(data[1]);
                state.svmloading = false;
              }).catch(error => {
                state.svmerror = 1;
                state.svmloading = false;
              });
          }}
        >
          Detect the Video
        </Button>}
      </Box>


      <canvas id="canvasOutput" width="256" height="256"></canvas>
    </Box>
  </>;
});
