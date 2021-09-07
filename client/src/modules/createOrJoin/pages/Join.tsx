import { Events, CodeLen, MaxNameLen } from "@connect-game/shared"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"
import * as yup from "yup"

import { useGame } from "context"
import { server } from "services"

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
    history.push("/join/name")
  }

  const handleNameSubmit = async () => {
    await formik.validateForm()
    joinRoom(formik.values.code, formik.values.name)
  }

  useEffect(() => {
    server.listen(Events.RoomFound, () => {
      history.push("/join/name")
    })

    server.listen(Events.RoomNotFound, () => {
      if (history.location.pathname === "/join/code") {
        formik.setFieldError("code", "Room not found")
      } else if (history.location.pathname === "/join/name") {
        formik.setFieldError("name", "Room no longer exists")
      }
    })

    server.listen(Events.InProgress, () => {
      formik.setFieldError("code", "Game in progress")
    })

    server.listen(Events.RoomJoined, () => {
      void formik.submitForm()
    })

    server.listen(Events.NameTaken, () => {
      formik.setFieldError("name", "Name taken")
    })

    return server.removeAllListeners
  })

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
