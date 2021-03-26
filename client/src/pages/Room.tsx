import React from "react";

import { Page, Label, Input, Button } from "../components";
import { useGame } from "../context";
import { usePreventBackNav } from "../hooks";

const Room: React.FC = () => {
  const { code, players, you, startGame, leaveRoom } = useGame();
  usePreventBackNav(leaveRoom);

  const handleStart = (): void => {
    if (you.isHost) startGame();
  };

  return (
    <Page>
      <Label>Room code</Label>
      <Input type="text" value={code} disabled />
      <Label>Players</Label>
      {players.map((player) => (
        <Button color={player.color} key={player.name} disabled>
          {player.name +
            (player.isHost ? " 👑" : "") +
            (player.name === you.name ? " ✨" : "")}
        </Button>
      ))}
      <Button
        onClick={handleStart}
        disabled={!you.isHost}
        style={{ marginTop: 20 }}
      >
        Start Game
      </Button>
      {/* <Button>Copy Link</Button> */}
    </Page>
  );
};

export default Room;
