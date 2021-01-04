import React from "react";
import styled from "styled-components";

import { colors, fontSizes } from "../config";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px auto 20px;
  cursor: pointer;
  max-width: 400px;
  height: 75px;
  background-color: ${colors.primary};
  color: ${colors.text.secondary};
  font-size: ${fontSizes.small}px;
`;

const Button: React.FC = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Button;
