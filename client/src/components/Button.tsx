import React from "react";
import styled, { css, CSSProperties } from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  color?: string;
  type?: "primary" | "secondary" | "negative";
  disabled?: boolean;
}

interface StyledDivProps {
  type: "primary" | "secondary" | "negative";
  color?: string;
  disabled?: boolean;
}

const StyledDiv = styled.div<StyledDivProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto 10px;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  width: ${(props) => props.theme.sizes.button.width}px;
  height: ${(props) => props.theme.sizes.button.height}px;
  opacity: ${(props) => (props.disabled && !props.color ? "50%" : "100%")};
  font-size: ${(props) => props.theme.sizes.text.small}px;

  ${(props) => {
    if (props.type === "primary") {
      return css`
        background-color: ${props.color ?? props.theme.colors.primary};
        color: ${props.theme.colors.text.secondary};
      `;
    }
    if (props.type === "secondary") {
      return css`
        background-color: ${props.color ?? props.theme.colors.secondary};
        color: ${props.theme.colors.text.primary};
        border-color: ${(props) => props.theme.colors.primary};
        border-style: solid;
        border-width: 2px;
      `;
    }
    if (props.type === "negative") {
      return css`
        background-color: ${props.color ?? props.theme.colors.negative};
        color: ${props.theme.colors.text.secondary};
      `;
    }
  }}
`;

export function Button({
  children,
  onClick,
  style,
  color,
  type = "primary",
  disabled = false,
}: ButtonProps) {
  return (
    <StyledDiv
      type={type}
      color={color}
      disabled={disabled}
      onClick={() => (disabled ? null : onClick?.())}
      style={style}
    >
      {children}
    </StyledDiv>
  );
}
