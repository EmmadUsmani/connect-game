import React from "react"
import styled from "styled-components"

interface PickerProps {
  value: string | number
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void
  options: { label: string; value: string | number }[]
}

const StyledSelect = styled.select`
  -moz-appearance: none; // first 2 lines hide dropdown arrow
  -webkit-appearance: none;
  width: ${(props) => props.theme.sizes.button.width}px;
  height: ${(props) => props.theme.sizes.button.height}px;
  cursor: pointer;
  text-align-last: center;
  outline: none;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: ${(props) => props.theme.sizes.text.medium}px;
`

export function Picker({ value, onChange, options }: PickerProps) {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map(({ label, value }, idx) => (
        <option key={idx} value={value}>
          {label}
        </option>
      ))}
    </StyledSelect>
  )
}
