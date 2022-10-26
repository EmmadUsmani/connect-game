import { GameSettings } from "@connect-game/shared"
import { Formik } from "formik"
import { Redirect, Route, Switch, useHistory } from "react-router"

import { Label, Button, Text } from "components"
import { Page, Spacer, List } from "components/layout"
import { Tooltip } from "components/wrapper"
import { useGame } from "context"
import { Settings } from "modules/createOrJoin/pages"

import { RoomCode } from "../components"

interface RoomForm {
  settings: GameSettings
}

export function Room() {
  const { gameState, startGame, updateSettings } = useGame()
  const history = useHistory()

  const handleStart = () => {
    if (gameState.play.you.isHost) {
      startGame()
    }
  }

  const handleFormSubmit = (values: RoomForm) => {
    updateSettings(values.settings)
    history.push("/room/main")
  }

  let startDisabled: boolean
  if (!gameState.play.you.isHost) {
    startDisabled = true
  } else if (
    // in production, do not start game with 1 player
    process.env.NODE_ENV === "production" &&
    gameState.room.players.length < 2
  ) {
    startDisabled = true
  } else {
    startDisabled = false
  }

  return (
    <Switch>
      <Route exact path={"/room/main"}>
        <Page>
          <Label>Room code</Label>
          <RoomCode code={gameState.room.code} />
          <Spacer size={20} />
          <Label>Players</Label>
          <List spacing={20}>
            {gameState.room.players.map((player) => (
              <Button key={player.name} disabled color={player.color}>
                <>{(player.isHost ? "👑 " : "") + player.name}</>
                {player.name === gameState.play.you.name ? (
                  <>
                    <Spacer size={4} />
                    <Text size={16}> (you)</Text>
                  </>
                ) : null}
              </Button>
            ))}
          </List>
          <Spacer size={40} />
          <List spacing={20}>
            <Tooltip
              float
              delay={25}
              disabled={!startDisabled}
              id="startGame"
              label="Only host can start game"
              offset={{ top: -12 }}
            >
              <Button disabled={startDisabled} onClick={handleStart}>
                Start Game
              </Button>
            </Tooltip>
            <Tooltip
              float
              delay={25}
              disabled={!startDisabled}
              id="settings"
              label="Only host can change settings"
              offset={{ top: -12 }}
            >
              <Button
                disabled={!gameState.play.you.isHost}
                onClick={() => history.push("/room/settings")}
              >
                Settings
              </Button>
            </Tooltip>
          </List>
        </Page>
      </Route>
      <Route exact path={"/room/settings"}>
        <Formik<RoomForm>
          initialValues={{ settings: gameState.room.settings }}
          onSubmit={handleFormSubmit}
        >
          {(formik) => (
            <Settings
              buttonText="Update Settings"
              field={formik.getFieldProps("settings")}
              helpers={formik.getFieldHelpers("settings")}
              onSubmit={formik.submitForm}
            />
          )}
        </Formik>
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

// TODO: create seperate Router component
