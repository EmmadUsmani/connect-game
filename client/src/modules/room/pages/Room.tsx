import { GameSettings } from "@connect-game/shared"
import { Formik } from "formik"
import { Redirect, Route, Switch, useHistory } from "react-router"

import { Label, Button } from "components"
import { Page, Spacer, List } from "components/layout"
import { useGame } from "context"
import { useOnKeyDown } from "hooks"
import { Settings } from "modules/createOrJoin/pages"

import { RoomCode } from "../components"

interface RoomForm {
  settings: GameSettings
}

export function Room() {
  const { gameState, startGame } = useGame()
  const history = useHistory()

  const handleStart = () => {
    if (gameState.play.you.isHost) {
      startGame()
    }
  }

  useOnKeyDown("Enter", handleStart)

  const handleFormSubmit = (values: RoomForm) => {
    console.log(values)
    history.push("/room/main")
  }

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
                {player.name +
                  (player.isHost ? " 👑" : "") +
                  (player.name === gameState.play.you.name ? " ✨" : "")}
              </Button>
            ))}
          </List>
          <Spacer size={40} />
          <List spacing={20}>
            <Button disabled={startDisabled} onClick={handleStart}>
              Start Game
            </Button>
            <Button
              disabled={!gameState.play.you.isHost}
              onClick={() => history.push("/room/settings")}
            >
              Settings
            </Button>
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
              buttonText="Change Settings"
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
