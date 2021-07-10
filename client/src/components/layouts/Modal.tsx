import React from "react";
import styled from "styled-components";

import { Page } from ".";

const StyledDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);
  z-index: 1;
`;

const Modal: React.FC = ({ children }) => {
  return (
    <StyledDiv>
      <Page>{children}</Page>
    </StyledDiv>
  );
};

export default Modal;
