import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import AppDrawer from "../components/AppDrawer";
import AppBar from "../components/AppBar";

import ViewBase from "../components/ViewBase";

import { useStore } from "../Store";

export default function Settings(props) {
  let [state, dispatch] = useStore();
  let [slackChannel, setSlackChannel] = useState(state.slack.channel);
  let [slackToken, setSlackToken] = useState(state.slack.token);

  function navigate(path) {
    props.history.push(path);
  }

  return (
    <>
      <AppBar title={"Settings"} />
      <AppDrawer navigate={navigate} />
      <ViewBase>
        <Paper style={{ padding: 16 }}>
          <TextField
            label="Slack Channel"
            value={slackChannel}
            onChange={e => setSlackChannel(e.target.value)}
            onBlur={e => {
              dispatch({
                type: "UPDATE_SETTINGS",
                path: ["slack", "channel"],
                value: slackChannel
              });
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Slack Token"
            style={{ marginLeft: 16 }}
            value={slackToken}
            onChange={e => setSlackToken(e.target.value)}
            onBlur={e => {
              dispatch({
                type: "UPDATE_SETTINGS",
                path: ["slack", "token"],
                value: slackToken
              });
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Slack Timestamp"
            style={{ marginLeft: 16 }}
            value={state.slack.ts}
            margin="normal"
            variant="outlined"
            disabled={true}
          />
        </Paper>
      </ViewBase>
    </>
  );
}
