import React from "react";
import useInput from "../hooks/useInput";

export default function Todo({ style, value, editable }) {
  let task = useInput(value);

  return (
    <div style={style}>
      {editable ? <input {...task} /> : <div>{task.value}</div>}
    </div>
  );
}
