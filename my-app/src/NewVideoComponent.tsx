import { Box, Button, Card } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useUserContext } from "./userContext";

declare let cv: any;
export const NewVideoComponent = observer(() => {
  const state = useUserContext();
  useEffect(()=>{
    let video: any = document.getElementById("videoInput");
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function (err) {
      console.log("An error occurred! " + err);
    });
  })
  const start = () => {
    state.videoArray = [];
    state.streaming = true;
    
  let video: any = document.getElementById("videoInput");
    console.log("opencv loaded, cv");
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(video);
    console.log(cap);
    const FPS = 15;
    const width = 320;
    const height = 240;
    function processVideo() {
      try {
        if (!state.streaming) {
          // clean and stop.
          src.delete();
          dst.delete();
          return;
        }
        let begin = Date.now();
        // start processing.
        cap.read(src);
        cv.imshow("canvasOutput", src);

        const canvas: any = document.getElementById("canvasOutput");
        const ctx = canvas.getContext("2d");
        let imgData = ctx.getImageData(0, 0, width, height).data;
        let data_w= []
        const data = []
        let step = 0;
        
        for (let i = 0; i <= imgData.length; i += 4) {
          if (step === width) {
            data.push(JSON.parse(JSON.stringify(data_w)))
            step = 0;
            data_w= []
          }
          data_w.push([imgData[i], imgData[i + 1], imgData[i + 2]]);
          ++step;
        }
        state.videoArray.push(data);
        console.log(state.videoArray)
        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
      } catch (err) {
        console.error(err);
      }
    }
    processVideo();
  };
  // schedule the first one.
  return (
    <>
      <Card raised>
        {cv && (
          <>
            <Button
              onClick={() => {
                start();
              }}
            >
              Start
            </Button>
            <Button
              onClick={() => {
                state.streaming = false;
              }}
            >
              Stop
            </Button>
          </>
        )}
      </Card>
      <Box>
        <video id="videoInput" width="320" height="240"></video>
        <canvas id="canvasOutput" width="320" height="240"></canvas>
      </Box>
    </>
  );
});
