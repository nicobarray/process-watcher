import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

const ProcessView = styled(Grid)`
  padding: 16px 32px!important;
`;

export const SpaceGrow = styled.div`
  flex-grow: 1;
`;

export const ButtonGroup = styled.div`
  > button {
    margin-left: 16px;
  }
`;

export default function ProcessViewBase({ children }) {
  return (
    <ProcessView container spacing={16} direction="column" justify="center">
      {children}
    </ProcessView>
  );
}
