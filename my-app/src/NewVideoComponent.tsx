import { Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useUserContext } from "./userContext";

declare let cv: any;
const streaming = true;
export const NewVideoComponent = observer(() => {
  const state = useUserContext();
  // useEffect(() => {
  //   state.cv = cv;
  // }, []);
  // const onLoaded = (cv: any) => {
  //   state.cv = cv;
  // };
  const start = () => {
    state.videoArray = [];
    state.streaming = true;
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
    console.log("opencv loaded, cv");
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(video);
    console.log(cap);
    const FPS = 30;
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
        // console.log(ctx);
        var imgData = ctx.getImageData(0, 0, 320, 240).data;
        // canvas to array then push at state.videoArray
        state.videoArray.push(imgData);

        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
      } catch (err) {
        console.error(err);
      }
    }
    processVideo();
    // setTimeout(processVideo, 0);
  };
  // schedule the first one.
  return (
    <>
      {/* <OpenCvProvider onLoad={onLoaded}> */}
      <video id="videoInput" width="320" height="240"></video>
      <canvas id="canvasOutput" width="320" height="240"></canvas>
      {cv && (
        <>
          <Button
            onClick={() => {
              start();
            }}
          >
            click me
          </Button>
          <Button
            onClick={() => {
              state.streaming = false;
            }}
          >
            stop
          </Button>
        </>
      )}
      {/* </OpenCvProvider> */}
    </>
  );
});
