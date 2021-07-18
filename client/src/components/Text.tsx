import styled from "styled-components"

interface TextProps {
  size?: number
}

export const Text = styled.div<TextProps>`
  font-size: ${(props) => props.size ?? props.theme.sizes.text.small}px;
`
