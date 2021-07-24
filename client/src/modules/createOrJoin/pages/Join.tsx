import { MaxNameLen } from "@connect-game/shared"
import React, { useState } from "react"
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom"

import { useGame } from "context"

import { Code, Name } from "."

export function Join() {
  const history = useHistory()
  const match = useRouteMatch()
  const { joinRoom } = useGame()

  const [name, setName] = useState("")
  const [code, setCode] = useState("")

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value
    if (newName.length > MaxNameLen) {
      return
    }
    setName(newName)
  }

  const handleNameSubmit = () => {
    history.push(`${match.path}/code`)
  }

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }

  const handleCodeSubmit = () => {
    joinRoom(code, name)
    history.push(`/room`)
  }

  return (
    <Switch>
      <Route exact path={`${match.path}/name`}>
        <Name
          value={name}
          onChange={handleNameChange}
          onSubmit={handleNameSubmit}
        />
      </Route>
      <Route exact path={`${match.path}/code`}>
        <Code
          value={code}
          onChange={handleCodeChange}
          onSubmit={handleCodeSubmit}
        />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
