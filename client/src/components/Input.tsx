import styled from "styled-components";

export const Input = styled.input`
  margin-bottom: 20px;
  width: ${(props) => props.theme.sizes.button.width}px;
  height: ${(props) => props.theme.sizes.button.height}px;
  box-sizing: border-box;
  text-align: center;
  outline: none;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: ${(props) => props.theme.sizes.text.small}px;
`;
