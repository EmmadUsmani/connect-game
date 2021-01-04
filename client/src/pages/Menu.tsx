import React from "react";

import { Text, TextInput, Button, Picker } from "../components";
import { fontSizes } from "../config";

const screens = [
  <>
    <Text size={fontSizes.extraLarge}>Connect</Text>
    <Button>Create Game</Button>
    <Button>Join Game</Button>
  </>,
  <>
    <Text size={fontSizes.large}>Enter your name</Text>
    <TextInput />
    <Button>Continue</Button>
  </>,
];

const Menu: React.FC = () => {
  return (
    <>
      <Picker />
    </>
  );
};

export default Menu;
