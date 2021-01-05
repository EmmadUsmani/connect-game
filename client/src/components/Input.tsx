import styled from "styled-components";

import { colors, fonts } from "../config";

const Input = styled.input`
  margin-bottom: 20px;
  width: 400px;
  height: 75px;
  box-sizing: border-box;
  text-align: center;
  outline: none;
  border-style: solid;
  border-color: ${colors.primary};
  background-color: ${colors.secondary};
  color: ${colors.text.primary};
  font-family: ${fonts.primary};
  font-size: ${fonts.sizes.small}px;
`;

export default Input;
