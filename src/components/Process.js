import React from "react";
import Todo from "./Todo";
import { useStore } from "../Store";

export default function Process() {
  const [state, dispatch] = useStore();

  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: "ADD_TODO" });
        }}
      >
        Add
      </button>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {state.todos.map((todo, index) => {
          return <Todo key={index} value={todo.value} />;
        })}
      </div>
    </div>
  );
}
