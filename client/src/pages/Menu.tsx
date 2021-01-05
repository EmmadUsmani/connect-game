import React from "react";
import styled from "styled-components";

import { Text, TextInput, Button, Picker } from "../components";
import { fonts } from "../config";

const StyledText = styled(Text)`
  margin-bottom: 60px;
`;

const screens = [
  <>
    <StyledText size={fonts.sizes.extraLarge}>Connect</StyledText>
    <Button>Create Game</Button>
    <Button>Join Game</Button>
  </>,
  <>
    <StyledText size={fonts.sizes.large}>Enter your name</StyledText>
    <TextInput />
    <Button>Continue</Button>
  </>,
  <>
    <Text>Board size</Text>
    <Picker />
  </>,
];

const Menu: React.FC = () => {
  return <div>{screens[1]}</div>;
};

export default Menu;
