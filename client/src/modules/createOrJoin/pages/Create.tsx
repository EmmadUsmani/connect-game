import {
  GameSettings,
  DefaultSettings,
  MaxNameLen,
  Events,
} from "@connect-game/shared"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"
import * as yup from "yup"

import { useGame } from "context"
import { server } from "services"

import { Name, Settings } from "."

interface CreateForm {
  name: string
  settings: GameSettings
}

const CreateFormSchema = yup.object({
  name: yup.string().max(MaxNameLen),
})

export function Create() {
  const history = useHistory()
  const { createRoom } = useGame()

  const handleFormSubmit = () => {
    history.push("/room")
  }

  const formik = useFormik<CreateForm>({
    initialValues: { name: "", settings: DefaultSettings },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: CreateFormSchema,
    onSubmit: handleFormSubmit,
  })
  const { submitForm } = formik

  const handleNameSubmit = async () => {
    const errors = await formik.validateForm()
    if (errors.name) {
      return
    }
    history.push(`/create/settings`)
  }

  const handleSettingsSubmit = async () => {
    await formik.validateForm()
    createRoom(formik.values.settings, formik.values.name)
    // TODO: wait x seconds for RoomJoined before displaying error
  }

  useEffect(() => {
    const listener = server.listen(Events.RoomJoined, () => {
      void submitForm()
    })

    return () => server.removeListener(listener)
  }, [submitForm])

  return (
    <Switch>
      <Route exact path={`/create/name`}>
        <Name
          field={formik.getFieldProps("name")}
          meta={formik.getFieldMeta("name")}
          onSubmit={handleNameSubmit}
        />
      </Route>
      <Route exact path={`/create/settings`}>
        <Settings
          field={formik.getFieldProps("settings")}
          helpers={formik.getFieldHelpers("settings")}
          onSubmit={handleSettingsSubmit}
        />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
