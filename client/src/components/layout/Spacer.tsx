import styled from "styled-components"

interface SpacerProps {
  size: number
}

export const Spacer = styled.div<SpacerProps>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`
