import React from "react"
import styled from "styled-components"

import { Spacer } from "."

interface ListProps {
  children: React.ReactNode
  spacing: number
  direction?: "row" | "column" | "row-reverse" | "column-reverse"
}

interface StyledDivProps {
  direction: "row" | "column" | "row-reverse" | "column-reverse"
}

const StyledDiv = styled.div<StyledDivProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: center;
`

export function List({ children, spacing, direction = "column" }: ListProps) {
  return (
    <StyledDiv direction={direction}>
      {React.Children.map(children, (child, index) =>
        index !== React.Children.count(children) - 1 && child !== null ? (
          <>
            {child}
            <Spacer size={spacing} />
          </>
        ) : (
          child
        )
      )}
    </StyledDiv>
  )
}
