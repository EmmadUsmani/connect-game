import React from "react";
import styled from "styled-components";

import { colors, fonts } from "../config";

interface PickerProps {
  value: string | number;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  options: { label: string; value: string | number }[];
}

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
  font-size: ${fonts.sizes.small}px;
`;

const Picker: React.FC<PickerProps> = ({ value, onChange, options }) => {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map(({ label, value }, idx) => (
        <option value={value} key={idx}>
          {label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Picker;
