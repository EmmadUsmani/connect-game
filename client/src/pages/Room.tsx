import React from "react";

import { Page, Label, Input, Button } from "../components";
import { useGame } from "../context";
import { usePreventBackNav } from "../hooks";

const Room: React.FC = () => {
  const { gameState, leaveRoom, startGame } = useGame();
  usePreventBackNav(leaveRoom);

  const handleStart = (): void => {
    if (gameState.play.you.isHost) startGame();
  };

  return (
    <Page>
      <Label>Room code</Label>
      <Input type="text" value={gameState.room.code} disabled />
      <Label>Players</Label>
      {gameState.room.players.map((player) => (
        <Button color={player.color} key={player.name} disabled>
          {player.name +
            (player.isHost ? " 👑" : "") +
            (player.name === gameState.play.you.name ? " ✨" : "")}
        </Button>
      ))}
      <Button
        onClick={handleStart}
        disabled={!gameState.play.you.isHost}
        style={{ marginTop: 20 }}
      >
        Start Game
      </Button>
      {/* <Button>Copy Link</Button> */}
    </Page>
  );
};

export default Room;
