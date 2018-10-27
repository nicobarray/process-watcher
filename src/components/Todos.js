import React, { useState } from "react";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import styled from "styled-components";

import Todo from "./Todo";
import { useStoreState } from "../Store";

const TodoList = styled(List)`
  
`;

export default function Todos({ editable }) {
  const state = useStoreState();

  return (
    state.todos.length > 0 && (
      <Paper>
        <TodoList>
          {state.todos.map((todo, index) => (
            <Todo
              key={index}
              value={todo.value}
              editable={editable}
              index={index}
            />
          ))}
        </TodoList>
      </Paper>
    )
  );
}
