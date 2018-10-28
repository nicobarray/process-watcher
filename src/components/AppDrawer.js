import React from "react";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useStore } from "../Store";

export default function AppDrawer(props) {
  const [state, dispatch] = useStore();

  function closeDrawer() {
    dispatch({ type: "CLOSE_DRAWER" });
  }

  function handleListItem(name) {
    return function() {
      if (name.toLowerCase() === "settings") {
        props.navigate("/settings");
      } else {
        props.navigate("/");
      }
    };
  }

  return (
    <Drawer open={state.drawer.open} onClose={closeDrawer}>
      <div
        tabIndex={0}
        role="button"
        onClick={closeDrawer}
        onKeyDown={closeDrawer}
      >
        <List>
          {["Process", "Settings"].map((text, index) => (
            <ListItem button key={text} onClick={handleListItem(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
