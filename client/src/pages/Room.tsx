import React from "react";

import { Page, Label, Input, Button, Link } from "../components";
import { useGame } from "../context";

const Room: React.FC = () => {
  const { code, players, startGame } = useGame();

  const handleStart = (): void => {
    startGame();
  };

  return (
    <Page>
      <Label>Room code</Label>
      <Input type="text" value={code} disabled />
      <Label>Players</Label>
      {players.map((player) => (
        <Button color={player.color} key={player.name} disabled>
          {player.name}
        </Button>
      ))}
      <Link to="/play">
        <Button onClick={handleStart} style={{ marginTop: 20 }}>
          Start Game
        </Button>
      </Link>
      <Button>Copy Link</Button>
    </Page>
  );
};

export default Room;
