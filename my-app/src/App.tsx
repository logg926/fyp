import React from "react";
import Button from "@material-ui/core/Button";
import { DropzoneAreaPhoto, DropzoneAreaVideo } from "./DropZone";
import { useUserContext } from "./userContext";
import { observer } from "mobx-react-lite";
import { NewVideoComponent } from "./NewVideoComponent";
const imageToRgbaMatrix = require("image-to-rgba-matrix");

const App = observer(() => {
  const state = useUserContext();
  return (
    <>
      <NewVideoComponent />
      {/* Put your Video here

      <DropzoneAreaVideo /> */}
      Put your Photo here
      <DropzoneAreaPhoto />
      {state.photoFile && state.videoArray.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            const imgFile = state.photoFile;
            const img = new Image();

            img.onload = function () {
              const canvas: any = document.getElementById("canvas");
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              const imgData = ctx.getImageData(0, 0, 320, 240).data;
              console.log("imgData", imgData);
            };
            img.src = URL.createObjectURL(imgFile);

            // // state.videoFile;
            // const imgbuff = await img!.arrayBuffer();
            // console.log(imgbuff);
            // imageToRgbaMatrix(imgbuff).then(console.log);
            // console.log("imgData", imgData);
          }}
        >
          Deepfake this video and Photo
        </Button>
      )}
      <canvas id="canvas"></canvas>
    </>
  );
});

export default App;
