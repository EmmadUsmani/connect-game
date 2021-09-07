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
  code: yup.string().length(CodeLen).uppercase(),
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
          formik.setFieldError("code", "Room not found")
        } else if (history.location.pathname === "/join/name") {
          formik.setFieldError("name", "Room no longer exists")
        }
      })
    )

    listeners.push(
      server.listen(Events.InProgress, () => {
        formik.setFieldError("code", "Game in progress")
      })
    )

    listeners.push(
      server.listen(Events.RoomJoined, () => {
        void formik.submitForm()
      })
    )

    listeners.push(
      server.listen(Events.NameTaken, () => {
        formik.setFieldError("name", "Name taken")
      })
    )

    return () => server.removeListeners(listeners)
  }, [formik, history])

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
// TODO: prevent listeners from being removed everytime form value updates
