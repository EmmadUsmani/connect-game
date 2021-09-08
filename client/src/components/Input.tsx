import styled from "styled-components"

interface InputProps {
  error?: boolean
}

export const Input = styled.input<InputProps>`
  width: ${(props) => props.theme.sizes.button.width}px;
  height: ${(props) => props.theme.sizes.button.height}px;
  box-sizing: border-box;
  text-align: center;
  outline: none;
  border-style: solid;
  border-color: ${(props) =>
    props.error ? props.theme.colors.negative : props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: ${(props) => props.theme.sizes.text.medium}px;
`
