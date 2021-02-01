import React from "react";
import Button from "@material-ui/core/Button";
import { DropzoneAreaPhoto, DropzoneAreaVideo } from "./DropZone";

function App() {
  return (
    <>
      <DropzoneAreaVideo />
      <DropzoneAreaPhoto />

      <Button variant="contained" color="primary">
        Deepfake this video and Photo
      </Button>
    </>
  );
}

export default App;
