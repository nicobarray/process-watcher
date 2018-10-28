import React from "react";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Markdown from "react-markdown";

import moment from "../lib/moment";
import { useStore } from "../Store";

import AppBar from "./AppBar";
import ViewBase, { SpaceGrow, ButtonGroup } from "./ViewBase";

export default function ProcessReport() {
  const [state, dispatch] = useStore();

  const duration = moment.duration(
    moment(state.process.endTimestamp).diff(
      moment(state.process.startTimestamp)
    )
  );

  const report = `
    # Process Report

    ## Summary

    The process took ${duration.format("HH[h] mm[m] ss[s]")} for ${
    state.todos.length
  } steps.
  `;

  return (
    <>
      <AppBar title={"Report"}>
        <ButtonGroup>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch({ type: "CANCEL_PROCESS" })}
          >
            Back
          </Button>
        </ButtonGroup>
      </AppBar>
      <ViewBase>
        <Paper
          style={{
            height: "50vh",
            padding: 32,
            fontFamily: "Roboto"
          }}
        >
          <Markdown source={report} />
        </Paper>
      </ViewBase>
    </>
  );
}
