import { Label, Input, Button } from "components"
import { Page } from "components/layouts"
import { useGame } from "context"
import { useOnKeyDown } from "hooks"

export function Room() {
  const { gameState, startGame } = useGame()

  const handleStart = () => {
    if (gameState.play.you.isHost) {
      startGame()
    }
  }

  useOnKeyDown("Enter", handleStart)

  let startDisabled: boolean
  if (!gameState.play.you.isHost) {
    startDisabled = true
  } else if (
    process.env.NODE_ENV === "production" &&
    gameState.room.players.length < 2
  ) {
    startDisabled = true
  } else {
    startDisabled = false
  }

  return (
    <Page>
      <Label>Room code</Label>
      <Input disabled type="text" value={gameState.room.code} />
      <Label>Players</Label>
      {gameState.room.players.map((player) => (
        <Button key={player.name} disabled color={player.color}>
          {player.name +
            (player.isHost ? " 👑" : "") +
            (player.name === gameState.play.you.name ? " ✨" : "")}
        </Button>
      ))}
      <Button
        disabled={startDisabled}
        style={{ marginTop: 20 }}
        onClick={handleStart}
      >
        Start Game
      </Button>
      {/* <Button>Copy Link</Button> */}
    </Page>
  )
}
