import React from "react";
import styled from "styled-components";

import { Page } from ".";

const StyledModalDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);
  z-index: 1;
`;

const StyledContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  padding-top: ${(props) => props.theme.sizes.button.height}px;
  padding-bottom: ${(props) => props.theme.sizes.button.height}px;
  padding-left: ${(props) => props.theme.sizes.button.width / 6}px;
  padding-right: ${(props) => props.theme.sizes.button.width / 6}px;
`;

const Modal: React.FC = ({ children }) => {
  return (
    <StyledModalDiv>
      <Page>
        <StyledContentDiv>{children}</StyledContentDiv>
      </Page>
    </StyledModalDiv>
  );
};

export default Modal;
