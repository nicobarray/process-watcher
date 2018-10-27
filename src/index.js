import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Process from "./components/Process";
import Store from "./Store";

function App() {
  return (
    <Store>
      <Process />
    </Store>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
