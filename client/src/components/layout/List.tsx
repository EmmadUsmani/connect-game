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
  const childrenArray = React.Children.toArray(children).filter(
    (child) => child !== null
  )

  return (
    <StyledDiv direction={direction}>
      {childrenArray.map((child, index) =>
        index !== childrenArray.length - 1 ? (
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
