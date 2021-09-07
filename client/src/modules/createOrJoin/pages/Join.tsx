import { MaxNameLen } from "@connect-game/shared"
import { Field, FieldProps, Formik } from "formik"
import React, { useState } from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"

import { useGame } from "context"

import { JoinForm } from ".."

import { Code, Name } from "."

export function Join() {
  const history = useHistory()
  const { joinRoom } = useGame()

  const [code, setCode] = useState("")
  const [name, setName] = useState("")

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
    <Formik<JoinForm>
      initialValues={{ code: "", name: "" }}
      onSubmit={() => console.log("submited")}
    >
      <Switch>
        <Route exact path={`/join/code`}>
          <Field name="code">
            {(props: FieldProps) => (
              <Code onSubmit={handleCodeSubmit} {...props} />
            )}
          </Field>
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
    </Formik>
  )
}
