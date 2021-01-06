import React from "react";

import { Page, Label, Input, Button, Link } from "../components";
import { Game, GameColor } from "../models";

const Room: React.FC = () => {
  Game.newGame([
    { name: "Alice", color: GameColor.Green },
    { name: "Bob", color: GameColor.Blue },
  ]);

  return (
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
      <Link to="/play">
        <Button style={{ marginTop: 20 }}>Start Game</Button>
      </Link>
      <Button>Copy Link</Button>
    </Page>
  );
};

export default Room;
