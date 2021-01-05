import React from "react";
import styled from "styled-components";

import { Text, TextInput, Button, Picker, Page } from "../components";
import { fonts } from "../config";

const StyledText = styled(Text)`
  margin-bottom: 60px;
`;

const screens = [
  <Page>
    <StyledText size={fonts.sizes.extraLarge}>Connect</StyledText>
    <Button>Create Game</Button>
    <Button>Join Game</Button>
  </Page>,
  <Page>
    <StyledText size={fonts.sizes.large}>Enter your name</StyledText>
    <TextInput />
    <Button>Continue</Button>
  </Page>,
  <Page>
    <Text>Board size</Text>
    <Picker />
  </Page>,
];

const Menu: React.FC = () => {
  return screens[0];
};

export default Menu;
