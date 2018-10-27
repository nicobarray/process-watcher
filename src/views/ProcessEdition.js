import React, { useState } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { useStoreDispatch } from "../Store";
import Todos from "../components/Todos";

const ProcessRoot = styled(Grid)`
  padding: 16px !important;

  width: 50vw;
`;

const SpaceGrow = styled.div`
  flex-grow: 1;
`;

const ButtonGroup = styled.div`
  > button {
    margin-left: 16px;
  }
`;

export default function() {
  let dispatch = useStoreDispatch();
  let [editable, setEditable] = useState(true);

  return (
    <ProcessRoot
      container
      spacing={16}
      direction="column"
      justify="center"
      alignItems="centers"
    >
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Process Watcher
        </Typography>
        <SpaceGrow />
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch({ type: "ADD_TODO" });
            }}
          >
            Add A new Task
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditable(!editable)}
          >
            {editable ? "Lock" : "Edit"}
          </Button>
        </ButtonGroup>
      </Toolbar>
      <Grid item>
        <Todos editable={editable} />
      </Grid>
    </ProcessRoot>
  );
}
