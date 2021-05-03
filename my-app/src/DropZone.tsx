import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { observer } from "mobx-react-lite";
import { useUserContext } from "./userContext";

declare let cv: any;
export const DropzoneAreaVideo = observer(() => {
  const state = useUserContext();
  function handleChange(files: File[]) {
    state.videoFile = files[0] ? URL.createObjectURL(files[0]) : null;
    state.svmresult = -1;
    state.svmerror = 0;
    state.capresult = -1;
    state.caperror = 0;
    state.cnnresult = -1;
    state.cnnerror = 0;
    state.ensresult = -1;
    state.enserror = 0;
  }
  return <DropzoneArea data-cy="drag-and-drop" showFileNames dropzoneText={"Drag and drop an video here or click"} filesLimit={1} onChange={handleChange} />;
});


export const DropzoneAreaPhoto = observer(() => {
  const state = useUserContext();
  function handleChange(files: File[]) {
    state.photoFile = files[0] ? URL.createObjectURL(files[0]) : null;
  }
  return <DropzoneArea data-cy="drag-and-drop" showFileNames dropzoneText={"Drag and drop an image here or click"} filesLimit={1} onChange={handleChange} />;
});

export const DropzoneAreaVideoForGen = observer(() => {

  const state = useUserContext();

  let vidElement = document.getElementById("videoSrc") as HTMLVideoElement
  const videoOnLoad = (() => {
    console.log("video loaded!")
    setTimeout(processVideo, 20);
  });

  let duration: number;
  

  const width = 256;
  const img = {
    detectvid: [] as any,
  };

  const svmimg = {
    detectimg: [] as any,
  };

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
      if (step == width) {
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
        if (step_svm == width) {
          data_svm.push(JSON.parse(JSON.stringify(data_svm_w)))
          step_svm = 0;
          data_svm_w = [];
        }
        data_svm_w.push(src.data[i]);
        ++step_svm;
      }
      svmimg.detectimg = data_svm;
    state.videoloadcomplete = true
    state.videoArray = img.detectvid
      src.delete();
      return
    }
    mat.delete();
    setTimeout(processVideo, delay);
  })

  function handleChange(files: File[]) {

  vidElement = document.getElementById("videoSrc") as HTMLVideoElement
    state.videoFile = files[0] ? URL.createObjectURL(files[0]) : null;
// console.log("hi", vidElement)
  vidElement && (vidElement.src = state.videoFile);
  vidElement && (vidElement.onloadedmetadata = function () {
    console.log('metadata loaded!');
    duration = vidElement.duration * 1000;
    videoOnLoad();
  });
    state.svmresult = -1;
    state.svmerror = 0;
    state.capresult = -1;
    state.caperror = 0;
    state.cnnresult = -1;
    state.cnnerror = 0;
    state.ensresult = -1;
    state.enserror = 0;
  }
  return<> 
  <DropzoneArea data-cy="drag-and-drop" showFileNames dropzoneText={"Drag and drop an video here or click"} filesLimit={1} onChange={handleChange} />
  <video id="videoSrc" width="256" height="256" autoPlay />
  </>
});