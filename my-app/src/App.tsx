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
import { Info } from "./Info";

const App = observer(() => {
  const items = [
    { text: "Info", route: "/" },
    { text: "Generation", route: "/Generation" },
    { text: "Detection", route: "/Detection" },
    { text: "Resources", route: "/Resources" },
  ];
  return (
    <Router>
      <AppBar position="static">
        <Toolbar variant="dense">
          <h1>Deepfake Portal</h1>
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
          <Box p={1}>
            <Button component={Link} to={items[2].route} variant="contained">
              {items[2].text}
            </Button>
          </Box>
          <Box p={1}>
            <Button component={Link} to={items[3].route} variant="contained">
              {items[3].text}
            </Button>
          </Box>
        </Toolbar>

      </AppBar>

      <Switch>
        <Route path="/" exact>
          <Box alignContent="center">
            <Info />
          </Box>
        </Route>
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
      </Switch>
    </Router>
  );
});

export default App;
