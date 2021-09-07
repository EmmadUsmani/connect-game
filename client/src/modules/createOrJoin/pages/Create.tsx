import { GameSettings, DefaultSettings, MaxNameLen } from "@connect-game/shared"
import React, { useState } from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"

import { useGame } from "context"

import { Name, Settings } from "."

export function Create() {
  const history = useHistory()
  const { createRoom } = useGame()

  const [name, setName] = useState("")
  const [settings, setSettings] = useState(DefaultSettings)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value
    if (newName.length > MaxNameLen) {
      return
    }
    setName(newName)
  }

  const handleNameSubmit = () => {
    history.push(`/create/settings`)
  }

  const handleSettingsChange = (newSettings: GameSettings) => {
    setSettings(newSettings)
  }

  const handleSettingsSubmit = () => {
    createRoom(settings, name)
    history.push("/room")
  }

  return (
    <Switch>
      <Route exact path={`/create/name`}>
        {/* <Name
          value={name}
          onChange={handleNameChange}
          onSubmit={handleNameSubmit}
        /> */}
      </Route>
      <Route exact path={`/create/settings`}>
        <Settings
          settings={settings}
          onChange={handleSettingsChange}
          onSubmit={handleSettingsSubmit}
        />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
