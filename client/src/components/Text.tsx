import styled from "styled-components";

import { fonts } from "../config";

interface TextProps {
  size?: number;
}

const Text = styled.div<TextProps>`
  font-size: ${(props) => props.size || fonts.sizes.small}px;
`;

export default Text;
