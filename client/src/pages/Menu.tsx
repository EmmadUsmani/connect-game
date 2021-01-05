import React from "react";
import styled from "styled-components";

import { Text, Input, Button, Picker, Page } from "../components";
import { GameColor } from "../models";
import { fonts } from "../config";

const StyledText = styled(Text)`
  margin-bottom: 60px;
`;

const Label = styled(Text)`
  margin-bottom: 5px;
  font-size: ${fonts.sizes.extraSmall}px;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

const StartButton = styled(Button)`
  margin-top: 20px;
`;

const screens = [
  <Page>
    <StyledText size={fonts.sizes.extraLarge}>Connect</StyledText>
    <Button>Create Game</Button>
    <Button>Join Game</Button>
  </Page>,
  <Page>
    <StyledText size={fonts.sizes.large}>Enter your name</StyledText>
    <Input type="text" />
    <Button>Continue</Button>
  </Page>,
  <Page>
    <Label>Board size</Label>
    <Picker />
    <Label>Turn timer</Label>
    <Picker />
    <Label>Powerups</Label>
    <Picker />
    <StyledButton>Create Game</StyledButton>
  </Page>,
  <Page>
    <Label>Room code</Label>
    <Input type="text" value="A8GTH20" disabled />
    <Label>Players</Label>
    <Button color={GameColor.Blue} disabled>
      Emmad
    </Button>
    <Button color={GameColor.Green} disabled>
      Alejandro
    </Button>
    <Button color={GameColor.Pink} disabled>
      Carlos
    </Button>
    <StartButton>Start Game</StartButton>
    <Button>Copy Link</Button>
  </Page>,
];

const Menu: React.FC = () => {
  return screens[3];
};

export default Menu;
