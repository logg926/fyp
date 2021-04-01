import React from "react";
import Button from "@material-ui/core/Button";
import { observer } from "mobx-react-lite";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Detection } from "./Detection";
import { Generation } from "./Generation";
import { useHistory } from "react-router-dom";
const imageToRgbaMatrix = require("image-to-rgba-matrix");

const App = observer(() => {
  const items = [
    { text: "Info", route: '/' },
    { text: "Generation", route: '/Generation' },
    { text: "Detection", route: '/Detection' },
    { text: "Resources", route: '/Resources' },
  ];
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <span>
            <h1>Deepfake Portal</h1>
          </span>
          <span>
            <Button component={Link} to={items[0].route} variant="contained">{items[0].text}</Button>
            <Button component={Link} to={items[1].route} variant="contained">{items[1].text}</Button>
            <Button component={Link} to={items[2].route} variant="contained">{items[2].text}</Button>
            <Button component={Link} to={items[3].route} variant="contained">{items[3].text}</Button>
          </span>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/generation">
          <Box alignContent="center">
            <Generation />
          </Box>
        </Route >
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

