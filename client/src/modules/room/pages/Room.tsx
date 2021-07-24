import { Label, Input, Button } from "components"
import { Page, Spacer } from "components/layout"
import { List } from "components/layout/List"
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
      <Input
        disabled
        value={gameState.room.code}
        onClick={() => navigator.clipboard.writeText(gameState.room.code)}
      />
      <Spacer size={20} />
      <Label>Players</Label>
      <List spacing={20}>
        {gameState.room.players.map((player) => (
          <Button key={player.name} disabled color={player.color}>
            {player.name +
              (player.isHost ? " 👑" : "") +
              (player.name === gameState.play.you.name ? " ✨" : "")}
          </Button>
        ))}
      </List>
      <Spacer size={30} />
      <Button disabled={startDisabled} onClick={handleStart}>
        Start Game
      </Button>
    </Page>
  )
}
