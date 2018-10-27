import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { useStore } from "../Store";
import Todos from "./Todos";
import ProcessViewBase, { SpaceGrow, ButtonGroup } from "./ProcessViewBase";

export default function() {
  let [state, dispatch] = useStore();

  return (
    <ProcessViewBase>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Process Watcher - Edition
        </Typography>
        <SpaceGrow />
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
      </Toolbar>
      <Grid item>
        <Todos />
      </Grid>
    </ProcessViewBase>
  );
}
