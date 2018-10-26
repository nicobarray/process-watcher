import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function useInput(defaultValue) {
  let [value, setValue] = useState(defaultValue);

  function onChange(e) {
    setValue(e.target.value);
  }

  return [value, onChange];
}

function Todo({ defaultTask, editable }) {
  let taskInput = useInput(defaultTask);

  return editable ? <input {...taskInput} /> : <div>{defaultTask}</div>;
}

function App() {
  return <Todo defaultTask={"Eat"} editable />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
