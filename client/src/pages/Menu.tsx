import React from "react";

import { Text, Button } from "../components";
import { fontSizes } from "../config";

const Menu: React.FC = () => {
  return (
    <>
      <Text size={fontSizes.extraLarge}>Connect</Text>
      <Button>Create Game</Button>
      <Button>Join Game</Button>
    </>
  );
};

export default Menu;
