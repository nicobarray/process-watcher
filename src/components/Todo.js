import React from "react";
import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import DeleteIcon from "@material-ui/icons/Delete";

import useInput from "../hooks/useInput";
import { useStoreDispatch } from "../Store";

const TodoField = styled(TextField).attrs({ fullWidth: true })`
  padding: 16px 24px !important;
`;

export default function Todo({ style, value, done, editable, index }) {
  let task = useInput(value);
  let dispatch = useStoreDispatch();

  return (
    <ListItem>
      <TodoField
        {...task}
        onBlur={e =>
          dispatch({ type: "UPDATE_TODO", value: e.target.value, index })
        }
      />
      <IconButton aria-label="Delete Task">
        <DeleteIcon onClick={() => dispatch({ type: "DELETE_TODO", index })} />
      </IconButton>
    </ListItem>
  );
}
