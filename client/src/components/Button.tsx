import styled from "styled-components";

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
  width: ${(props) => props.theme.sizes.button.width}px;
  height: ${(props) => props.theme.sizes.button.height}px;
  background-color: ${(props) =>
    props.color ? props.color : props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text.secondary};
  opacity: ${(props) => (props.disabled && !props.color ? "50%" : "100%")};
  font-size: ${(props) => props.theme.sizes.text.small}px;
`;

export default Button;
