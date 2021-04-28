import React from "react";
import Button from "@material-ui/core/Button";
import { observer } from "mobx-react-lite";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Detection } from "./Detection";
import { Generation } from "./Generation";
import { Resources } from "./Resources";
import { useHistory } from "react-router-dom";
import { X2face } from "./X2face";
const imageToRgbaMatrix = require("image-to-rgba-matrix");

const App = observer(() => {
  const items = [
    { text: "Info", route: "/" },
    { text: "Generation", route: "/Generation" },
    { text: "Detection", route: "/Detection" },
    { text: "Resources", route: "/Resources" },
    { text: "Generation with X2face", route: "/x2face" },
    { text: "Generation with First Order Motion Model", route: "/Generation" },
  ];
  return (
    <Router>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/* <span> */}
          <h1>Deepfake Portal</h1>
          {/* </span> */}
          {/* <span> */}
          <Box p={1}>
            <Button component={Link} to={items[0].route} variant="contained">
              {items[0].text}
            </Button>
          </Box>

          <Box p={1}>
            <Button component={Link} to={items[1].route} variant="contained">
              {items[1].text}
            </Button>
          </Box>

          {/* <Box p={1}>
            {" "}
            <Button component={Link} to={items[4].route} variant="contained">
              {items[4].text}
            </Button>
          </Box> */}
          <Box p={1}>
            {" "}
            <Button component={Link} to={items[2].route} variant="contained">
              {items[2].text}
            </Button>
          </Box>
          <Box p={1}>
            {" "}
            <Button component={Link} to={items[3].route} variant="contained">
              {items[3].text}
            </Button>
          </Box>
          {/* </span> */}
        </Toolbar>

      <Switch>
        <Route path="/generation">

        <Button component={Link} to={items[4].route} variant="contained">
              {items[4].text}
            </Button>

            <Button component={Link} to={items[5].route} variant="contained">
              {items[5].text}
            </Button>
        </Route>

        <Route path="/x2face">
        <Button component={Link} to={items[4].route} variant="contained">
              {items[4].text}
            </Button>

            <Button component={Link} to={items[5].route} variant="contained">
              {items[5].text}
            </Button>
        </Route>
      </Switch>
      </AppBar>

      <Switch>
        <Route path="/generation">
          <Box alignContent="center">
            <Generation />
          </Box>
        </Route>
        <Route path="/detection">
          <Box alignContent="center">
            <Detection />
          </Box>
        </Route>
        <Route path="/resources">
          <Box alignContent="center">
            <Resources />
          </Box>
        </Route>
        <Route path="/x2face">
          <Box alignContent="center">
            <X2face />
          </Box>
        </Route>
      </Switch>
    </Router>
  );
});

export default App;
