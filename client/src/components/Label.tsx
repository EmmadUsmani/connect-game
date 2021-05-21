import styled from "styled-components";

import { Text } from ".";

const Label = styled(Text)`
  margin-bottom: 5px;
  font-size: ${(props) => props.theme.sizes.text.extraSmall}px;
`;

export default Label;
