import React from "react";

import { useStore } from "../Store";
import { ProcessState } from "../constants";

import ProcessEdition from "../components/ProcessEdition";
import ProcessRun from "../components/ProcessRun";

export default function Process() {
  let [
    {
      process: { state }
    }
  ] = useStore();

  if (state === ProcessState.EDITION) return <ProcessEdition />;
  else if (state === ProcessState.PROCESS) return <ProcessRun />;
  else {
    return <div>Unimplemeted State !</div>;
  }
}
