import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Process from "./views/ProcessEdition";
import Store from "./Store";

function App() {
  return (
    <Store>
      <CssBaseline />
      <Process />
    </Store>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
