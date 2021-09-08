import { Events, CodeLen, MaxNameLen } from "@connect-game/shared"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"
import * as yup from "yup"

import { useGame } from "context"
import { ListenerId, server } from "services"

import { Code, Name } from "."

interface JoinForm {
  code: string
  name: string
}

const JoinFormSchema = yup.object({
  code: yup.string().length(CodeLen, "Code must be 7 characters"),
  name: yup.string().max(MaxNameLen),
})

export function Join() {
  const history = useHistory()
  const { joinRoom } = useGame()

  const handleFormSubmit = () => {
    history.push("/room")
  }

  const formik = useFormik<JoinForm>({
    initialValues: { code: "", name: "" },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: JoinFormSchema,
    onSubmit: handleFormSubmit,
  })
  const { setFieldError, submitForm } = formik

  const handleCodeSubmit = async () => {
    const errors = await formik.validateForm()
    if (errors.code) {
      return
    }
    server.getRoom(formik.values.code)
  }

  const handleNameSubmit = async () => {
    await formik.validateForm()
    joinRoom(formik.values.code, formik.values.name)
  }

  useEffect(() => {
    const listeners: ListenerId[] = []

    listeners.push(
      server.listen(Events.RoomFound, () => {
        history.push("/join/name")
      })
    )

    listeners.push(
      server.listen(Events.RoomNotFound, () => {
        if (history.location.pathname === "/join/code") {
          setFieldError("code", "Room not found")
        } else if (history.location.pathname === "/join/name") {
          setFieldError("name", "Room no longer exists")
        }
      })
    )

    listeners.push(
      server.listen(Events.InProgress, () => {
        setFieldError("code", "Game in progress")
      })
    )

    listeners.push(
      server.listen(Events.RoomJoined, () => {
        void submitForm()
      })
    )

    listeners.push(
      server.listen(Events.NameTaken, () => {
        setFieldError("name", "Name taken")
      })
    )

    return () => server.removeListeners(listeners)
  }, [history, setFieldError, submitForm])

  return (
    <Switch>
      <Route exact path={"/join/code"}>
        <Code
          field={formik.getFieldProps("code")}
          meta={formik.getFieldMeta("code")}
          onSubmit={handleCodeSubmit}
        />
      </Route>
      <Route exact path={"/join/name"}>
        <Name
          field={formik.getFieldProps("name")}
          meta={formik.getFieldMeta("name")}
          onSubmit={handleNameSubmit}
        />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

// TODO: add loader to button
