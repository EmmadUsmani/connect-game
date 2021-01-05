import React from "react";

import { Text, TextInput, Button, Picker } from "../components";
import { fonts } from "../config";

const screens = [
  <>
    <Text size={fonts.sizes.extraLarge}>Connect</Text>
    <Button>Create Game</Button>
    <Button>Join Game</Button>
  </>,
  <>
    <Text size={fonts.sizes.large}>Enter your name</Text>
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
