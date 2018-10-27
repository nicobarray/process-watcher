import React from "react";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";

import Todo from "./Todo";
import { useStoreState } from "../Store";

export default function Todos() {
  const state = useStoreState();

  return (
    state.todos.length > 0 && (
      <Paper>
        <List>
          {state.todos.map((todo, index) => (
            <Todo key={index} value={todo.value} editable index={index} />
          ))}
        </List>
      </Paper>
    )
  );
}
