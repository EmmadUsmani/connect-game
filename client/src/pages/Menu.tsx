import React from "react";

import { Text, Button } from "../components";

const Menu: React.FC = () => {
  return (
    <div>
      <Text size={72}>Connect</Text>
      <Button>Create Game</Button>
      <Button>Join Game</Button>
    </div>
  );
};

export default Menu;
