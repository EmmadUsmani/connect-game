import styled from "styled-components";

import { Text } from ".";
import { fonts } from "../config";

const Label = styled(Text)`
  margin-bottom: 5px;
  font-size: ${fonts.sizes.extraSmall}px;
`;

export default Label;
