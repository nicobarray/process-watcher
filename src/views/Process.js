import React from "react";

import { useStore } from "../Store";
import { ProcessState } from "../constants";

import AppDrawer from "../components/AppDrawer";
import ProcessEdition from "../components/ProcessEdition";
import ProcessRun from "../components/ProcessRun";
import ProcessReport from "../components/ProcessReport";

export default function Process(props) {
  let [
    {
      process: { state }
    }
  ] = useStore();

  function renderContent() {
    if (state === ProcessState.EDITION) return <ProcessEdition />;
    else if (state === ProcessState.PROCESS) return <ProcessRun />;
    else if (state === ProcessState.REPORT) return <ProcessReport />;
    else {
      return <div>Unimplemeted State !</div>;
    }
  }

  function navigate(path) {
    props.history.push(path);
  }

  return (
    <>
      <AppDrawer navigate={navigate} />
      {renderContent()}
    </>
  );
}
