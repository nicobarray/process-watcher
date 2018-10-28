import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { useStore } from "../Store";
import Todos from "./Todos";
import AppBar from "./AppBar";
import ViewBase, { ButtonGroup } from "./ViewBase";

export default function() {
  let [state, dispatch] = useStore();

  return (
    <>
      <AppBar title="Edition">
        <ButtonGroup>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch({ type: "ADD_TODO" });
            }}
          >
            Add A new Task
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch({ type: "LOCK_PROCESS" })}
            disabled={state.todos.length === 0}
          >
            Next
          </Button>
        </ButtonGroup>
      </AppBar>
      <ViewBase>
        <Grid item>
          <Todos />
        </Grid>
      </ViewBase>
    </>
  );
}
