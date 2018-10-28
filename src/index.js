import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Process from "./views/Process";
import Settings from "./views/Settings";

import Store from "./Store";

function App() {
  return (
    <Store>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/settings" component={Settings} />
          <Route exact component={Process} />
        </Switch>
      </Router>
    </Store>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
