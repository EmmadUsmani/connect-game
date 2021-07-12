import { Label, Input, Button } from "components";
import { Page } from "components/layouts";
import { useGame } from "context";
import { useOnKeyDown } from "hooks";

export function Room() {
  const { gameState, startGame } = useGame();

  const handleStart = () => {
    if (gameState.play.you.isHost) startGame();
  };

  useOnKeyDown("Enter", handleStart);

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
}
