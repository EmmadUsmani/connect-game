import styled from "styled-components"

interface TextProps {
  size?: number
  color?: string
}

export const Text = styled.div<TextProps>`
  font-size: ${(props) => props.size ?? props.theme.sizes.text.medium}px;
  color: ${(props) => props.color};
`
