import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  let task = useState("42");
  return <div>{task}</div>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
