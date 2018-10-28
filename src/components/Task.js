import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useStore, useStoreDispatch } from "../Store";
import { TodoStatus } from "../constants";

import { SpaceGrow, ButtonGroup } from "./ViewBase";

function TaskActions({ running, selected, index }) {
  let dispatch = useStoreDispatch();

  function onClick(callback) {
    return function(e) {
      e.stopPropagation();
      callback();
    };
  }

  return (
    <ButtonGroup>
      <Button
        onClick={onClick(() => {
          dispatch({ type: "NEXT_STEP", timestamp: Date.now(), index });
        })}
        disabled={!running || !selected}
      >
        <span role="img" arial-labelly="check">
          {" "}
          ✅
        </span>
      </Button>
      <Button
        onClick={onClick(() => {
          dispatch({ type: "ABORT_PROCESS", timestamp: Date.now() });
        })}
        disabled={!running || !selected}
      >
        <span role="img" arial-labelly="boom">
          {" "}
          💥
        </span>
      </Button>
    </ButtonGroup>
  );
}

function TaskStatus({ status }) {
  switch (status) {
    case TodoStatus.CREATED:
      return null;
    case TodoStatus.VALIDATED:
      return (
        <span role="img" arial-labelly="check">
          {" "}
          ✅
        </span>
      );
    case TodoStatus.FAILED:
      return (
        <span role="img" arial-labelly="boom">
          {" "}
          💥
        </span>
      );
    default:
      return (
        <span role="img" arial-labelly="question mark">
          {" "}
          ❓
        </span>
      );
  }
}

export default function Task({ value, index, selected }) {
  let [state] = useStore();

  const {
    process: { running }
  } = state;
  const todo = state.todos[index];

  return (
    <ExpansionPanel expanded={selected}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="headline" color="inherit">
          {index + 1}. {value}
        </Typography>
        <SpaceGrow />
        {selected ? (
          <TaskActions {...{ running, selected, index }} />
        ) : (
          <TaskStatus {...{ status: todo.status }} />
        )}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>git pull origin master --rebase</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
