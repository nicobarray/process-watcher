import React from "react";

import MUAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { SpaceGrow } from "./ViewBase";

import { useStoreDispatch } from "../Store";

export default function AppBar(props) {
  let dispatch = useStoreDispatch();

  return (
    <MUAppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          onClick={() => dispatch({ type: "OPEN_DRAWER" })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          {props.title}
        </Typography>
        <SpaceGrow />
        {props.children}
      </Toolbar>
    </MUAppBar>
  );
}
