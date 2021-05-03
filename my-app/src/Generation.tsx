import React from "react";
import { DropzoneAreaPhoto } from "./DropZone";
import { NewVideoComponent } from "./NewVideoComponent";
import { Box, Card, Button } from "@material-ui/core";
import { useUserContext } from "./userContext";
import { observer } from "mobx-react-lite";
import { postData } from "./dataservice";
import CircularProgress from "@material-ui/core/CircularProgress";
export const Generation = observer(() => {
  const state = useUserContext();
  let imgElement = document.getElementById("imageSrc") as HTMLImageElement;
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
      canvas.width = imgElement.width; // set canvas size big enough for the image
      canvas.height = imgElement.height;
      ctx.drawImage(imgElement, 0, 0, 256, 256);

      const height = 256;
      const width = 256;
      const imgData = ctx.getImageData(0, 0, height, width).data;
      let data_w = [];
      const data = [];
      let step = 0;

      for (let i = 0; i <= imgData.length; i += 4) {
        if (step === width) {
          data.push(JSON.parse(JSON.stringify(data_w)));
          step = 0;
          data_w = [];
        }
        data_w.push([imgData[i], imgData[i + 1], imgData[i + 2]]);
        ++step;
      }
      gen.sourceimg = data;
    });

  if (!state.streaming && state.videoArray) {
    gen.drivevid = JSON.parse(JSON.stringify(state.videoArray));
  }

  return (
    <>
      <Box p={2} alignContent="center">
        <b>Deepfakes Generation</b>
        <br></br>
        <Box p={2} alignContent="center">
          Record your video:
          <NewVideoComponent />
        </Box>
        <Box p={2}>
          <Card raised>
            <Box p={5}>
              Put your Photo here:
              <DropzoneAreaPhoto />
              Preview:
              <img id="imageSrc" alt="No image" width="256" />
            </Box>
          </Card>
        </Box>
        <Box p={5}>
          {state.genloading && <CircularProgress />}
          {state.photoFile && !state.genloading && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                state.genloading = true;
                postData("http://localhost:8000/gen", gen).then((data) => {
                  state.generationlink = data;
                  state.genloading = false;
                });
              }}
            >
              Deepfake this video and Photo with First Order Motion Model
            </Button>
          )}
          {state.photoFile && !state.genloading && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                state.genloading = true;
                postData("http://localhost:8000/x2gen", gen).then((data) => {
                  state.generationlink = data;
                  state.genloading = false;
                });
              }}
            >
              Deepfake this video and Photo with X2Face
            </Button>
          )}
          {state.generationlink && (
            <Box p={1}>
              <a href={"http://localhost:8000/" + state.generationlink}>
                Click me to download
              </a>
            </Box>
          )}
        </Box>
        <canvas id="canvas" width="256" height="256"></canvas>
      </Box>
    </>
  );
});
