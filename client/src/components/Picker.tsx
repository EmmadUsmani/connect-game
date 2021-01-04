import React from "react";
import styled from "styled-components";

import { colors, fonts, fontSizes } from "../config";

const StyledSelect = styled.select`
  -moz-appearance: none; // first 2 lines hide dropdown arrow
  -webkit-appearance: none;
  margin-bottom: 20px;
  width: 400px;
  height: 75px;
  cursor: pointer;
  text-align-last: center;
  outline: none;
  border-style: solid;
  border-color: ${colors.primary};
  background-color: ${colors.secondary};
  color: ${colors.text.primary};
  font-family: ${fonts.primary};
  font-size: ${fontSizes.small}px;
`;

const Picker: React.FC = () => {
  return (
    <StyledSelect>
      <option value="7x6">7 columns x 6 rows</option>
      <option value="12x12">12 columns x 12 rows</option>
    </StyledSelect>
  );
};

export default Picker;
