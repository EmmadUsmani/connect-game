import React from "react";
import styled from "styled-components";

import { fonts } from "../config";

interface Props {
  size?: number;
  children: React.ReactNode;
}

interface StyledProps {
  size?: number;
}

const StyledP = styled.p<StyledProps>`
  font-size: ${(props) => props.size || fonts.sizes.small}px;
`;

const Text: React.FC<Props> = ({ size, children }) => {
  return <StyledP size={size}>{children}</StyledP>;
};

export default Text;
