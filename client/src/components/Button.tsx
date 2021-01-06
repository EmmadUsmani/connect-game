import styled from "styled-components";

import { colors, fonts } from "../config";

interface ButtonProps {
  color?: string;
  disabled?: boolean;
}

const Button = styled.div<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px auto 20px;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  width: 400px;
  height: 75px;
  background-color: ${(props) => (props.color ? props.color : colors.primary)};
  color: ${colors.text.secondary};
  opacity: ${(props) => (props.disabled && !props.color ? "50%" : "100%")};
  font-size: ${fonts.sizes.small}px;
`;

export default Button;
