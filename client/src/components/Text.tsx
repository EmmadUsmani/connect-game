import styled from "styled-components";

interface TextProps {
  size?: number;
}

const Text = styled.div<TextProps>`
  font-size: ${(props) => props.size || props.theme.sizes.text.small}px;
`;

export default Text;
