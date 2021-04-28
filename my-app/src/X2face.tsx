import React from "react";
import { DropzoneAreaPhoto } from "./DropZone";
import { NewVideoComponent } from "./NewVideoComponent";
import { Box, Card, Button } from "@material-ui/core";
import { useUserContext } from "./userContext";
import { observer } from "mobx-react-lite";
import { postData } from "./dataservice";
import CircularProgress from "@material-ui/core/CircularProgress";
declare let cv: any;
let result = [];
export const X2face = observer(() => {
  const state = useUserContext();
  const width = 1000;
  const height = 1000;
  let imgElement = document.getElementById("imageSrc") as HTMLImageElement;
  // let imgElement = document.getElementById("imageSrc") as HTMLImageElement
  // imgElement && (imgElement.src = state.photoFile);
  const gen = {
    sourceimg: [0],
    drivevid: [0],
    fps: 15,
  };

  imgElement && (imgElement.src = state.photoFile);

  imgElement &&
    (imgElement.onload = function () {
      const canvas: any = document.getElementById("canvas");
      const ctx = canvas && canvas.getContext("2d");
      canvas.width = imgElement.width;      // set canvas size big enough for the image
      canvas.height = imgElement.height;
      ctx.drawImage(imgElement, 0, 0, 256, 256);
      
      const height =256
      const width = 256
      console.log("height", height)
      console.log("width", width)
      const imgData = ctx.getImageData(0, 0, height, width).data;
      console.log(imgData)
      let data_w= []
      const data = []
      let step = 0;

      for (let i = 0; i <= imgData.length; i += 4) {
        if (step == width) {
          data.push(JSON.parse(JSON.stringify(data_w)))
          // console.log(data_w)
          step = 0;
          data_w= []
        }
        data_w.push([imgData[i], imgData[i + 1], imgData[i + 2]]);
        // console.log(data_w)
        ++step;
      }
    //   let mat = cv.imread("canvas");

    //   console.log("mat", mat);
    //   let data = Array.from(mat.data[0:mat.cols*mat.rows*4]);
    //   console.log("data",data)
    //   const newArr = [];
    //   while (data.length) newArr.push(data.splice(0, 4));

      // for (let  i=0; i<mat.rows*4; ++i){

      //     data[i] = mat.data[i];
      // }
      gen.sourceimg = data
      console.log("sourceimg", gen.sourceimg);
    });

  console.log(state.photoFile);
  // console.log(imgElement.src)

  // const imgOnLoad = (() => {
  //     console.log("image loaded!")

  // let mat = cv.imread(imgElement);
  // // cv.imshow('canvasOutput', mat);
  // console.log(mat);
  // // let dst = new cv.Mat();
  // // let rect = new cv.Rect(100, 100, 200, 200);
  // // console.log(rect)
  // // let img = cv.matFromImageData(mat);
  // // console.log(img);
  // let dst = new cv.Mat();
  // mat.convertTo(dst, cv.CV_8U);
  // let arrOut: any = [];
  // for (let i = 0; i < dst.rows; ++i) {
  //     arrOut[i] = []
  //     for (let j = 0; j < dst.cols; ++j) {
  //         arrOut[i][j] = dst.ucharAt(i, j);
  //     }
  // };
  // img.source_img = arrOut;
  // // console.log(detectimg)
  // // console.log(arrOut);
  // // cv.imshow("canvasOutput", dst)
  // // console.log(arrOut[0])
  // // console.log(detectimg)
  // // console.log(dst.data)
  // mat.delete();
  // dst.delete();
  // console.log(img)
  // });

  if (!state.streaming && state.videoArray) {
    // console.log(state.videoArray.length)
    // console.log(state.videoArray)
    let arrOut: any = [];
    // for (let i = 0; i < state.videoArray.length; i++) {
    //     for (let j = 0; j< state.videoArray[i].length; j++) {
    //         for (let k = 0; k < state.videoArray[i][j].length; k++) {
    //             for (let l = 0; l < state.videoArray[i][j][k].length; l++) {
    //                 arrOut.push(state.videoArray[i][j][k][l])
    //             }
    //         }
    //     }
    // }
    gen.drivevid = JSON.parse(JSON.stringify(state.videoArray));
    // console.log (gen.drivevid)
    // state.videoArray[0]
    // img.driving_vid = state.videoArray;
    // console.log(img.driving_vid)
  }
  // console.log(img)

  return (
    <>
    <Box p={2} alignContent="center">
      Record your video:
      <Box p={2} alignContent="center">
        <NewVideoComponent />
      </Box>
      {/* Put your Video here

          <DropzoneAreaVideo /> */}

      <Box p={2}>
      <Card raised >
          
        <Box p={5}>
        Put your Photo here:
          <DropzoneAreaPhoto />
        Preview:
        <img id="imageSrc" alt="No image" width="256" />
        </Box>
        {/* <canvas id="canvasOutput" ></canvas> */}
      </Card>
        </Box>
      <Box p={5}>
        {state.genloading && <CircularProgress />}
        {state.photoFile && !state.genloading && (
          <Button
            variant="contained"
            color="primary"
            // onClick={async () => {
            //     const imgFile = state.photoFile;
            //     const img = new Image();

            //     img.onload = function () {
            //         const canvas: any = document.getElementById("canvas");
            //         const ctx = canvas.getContext("2d");
            //         ctx.drawImage(img, 0, 0);
            //         const imgData = ctx.getImageData(0, 0, 256, 256).data;
            //         console.log("imgData", imgData);
            //     };
            //     img.src = URL.createObjectURL(imgFile);

            //     // // state.videoFile;
            //     // const imgbuff = await img!.arrayBuffer();
            //     // console.log(imgbuff);
            //     // imageToRgbaMatrix(imgbuff).then(console.log);
            //     // console.log("imgData", imgData);
            // }}
            onClick={() => {
              console.log(gen);
              // set loading
              state.genloading = true;
              postData("http://localhost:8000/x2gen", gen).then((data) => {
                // setSvmresult(parseInt(data[1]));
                console.log(data);
                state.generationlink = data;
                state.genloading = false;
              });
            }}
          >
            Deepfake this video and Photo
          </Button>
        )}
        <Box p={1}>
          
        {state.generationlink && (
          <a href={"http://localhost:8000/" + state.generationlink}>
            Click me to download
          </a>
        )}
        </Box>
      </Box>
        <canvas id="canvas" 
        width="256" height="256"
        ></canvas>
      </Box>
    </>
  );
});