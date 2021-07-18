import styled from "styled-components"

interface SpacerProps {
  size: number
}

export const Spacer = styled.div<SpacerProps>`
  height: ${(props) => props.size}px;
`
