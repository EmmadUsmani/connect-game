import { MaxNameLen } from "@connect-game/shared"
import React, { useState } from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"

import { useGame } from "context"

import { Code, Name } from "."

export function Join() {
  const history = useHistory()
  const { joinRoom } = useGame()

  const [code, setCode] = useState("")
  const [name, setName] = useState("")

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }

  const handleCodeSubmit = () => {
    history.push(`/join/name`)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value
    if (newName.length > MaxNameLen) {
      return
    }
    setName(newName)
  }

  const handleNameSubmit = () => {
    joinRoom(code, name)
    history.push(`/room`)
  }

  return (
    <Switch>
      <Route exact path={`/join/code`}>
        <Code
          value={code}
          onChange={handleCodeChange}
          onSubmit={handleCodeSubmit}
        />
      </Route>
      <Route exact path={`/join/name`}>
        <Name
          value={name}
          onChange={handleNameChange}
          onSubmit={handleNameSubmit}
        />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
