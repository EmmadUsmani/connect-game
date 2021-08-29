import React from "react"
import styled from "styled-components"

interface ClickableProps {
  children: React.ReactNode
  onClick?(): void
  disabled?: boolean
}

interface StyledDivProps {
  disabled: boolean
}

const StyledDiv = styled.div<StyledDivProps>`
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
`

export function Clickable({
  children,
  onClick,
  disabled = false,
}: ClickableProps) {
  return (
    <StyledDiv
      disabled={disabled}
      onClick={() => (disabled ? null : onClick?.())}
    >
      {children}
    </StyledDiv>
  )
}
