import React from "react";
import Button from "@material-ui/core/Button";
import { DropzoneAreaPhoto, DropzoneAreaVideo } from "./DropZone";
import { useUserContext } from "./userContext";
import { observer } from "mobx-react-lite";
import Box from "@material-ui/core/Box";
import { NewVideoComponent } from "./NewVideoComponent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Card } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Detection } from "./Detection";
const imageToRgbaMatrix = require("image-to-rgba-matrix");
const App = observer(() => {
  const state = useUserContext();
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <span>
            <h1>Deepfake Portal</h1> 
            {/* <span className="divider">|</span> */}
          </span>
          <Button component={Link} to="/" variant="contained">Info</Button>
          <Button component={Link} to="/generation" variant="contained">Generation</Button>
          <Button component={Link} to="/detection" variant="contained">Detection</Button>
          <Button component={Link} to="/resources" variant="contained">Resources</Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/generation">
          Record your video:
          <Box alignContent="center">
            <NewVideoComponent />
          </Box>
          {/* Put your Video here

          <DropzoneAreaVideo /> */}
          <Card raised>
            Put your Photo here:
            <Box>
              <DropzoneAreaPhoto />
            </Box>
          </Card>
          <Box>
            {state.photoFile && (
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
          </Box>
          <Box>
            <canvas id="canvas"></canvas>
          </Box>
        </Route>

        <Route path="/detection">
          <Box alignContent="center">
            <Detection />
          </Box>
        </Route>
      </Switch>
    </Router>
  );
});


export default App;

