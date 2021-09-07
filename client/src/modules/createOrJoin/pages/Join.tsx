import { Field, FieldProps, Formik, FormikProps } from "formik"
import React from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"

import { useGame } from "context"

import { JoinForm, JoinFormSchema } from ".."

import { Code, Name } from "."

export function Join() {
  const history = useHistory()
  const { joinRoom } = useGame()

  const handleCodeSubmit = (formikProps: FormikProps<JoinForm>) => async () => {
    const errors = await formikProps.validateForm()
    if (!errors.code) {
      history.push("/join/name")
    }
  }

  const handleNameSubmit = (formikProps: FormikProps<JoinForm>) => async () => {
    await formikProps.validateForm()
    void formikProps.submitForm()
  }

  const handleFormSubmit = () => {
    history.push("/room")
  }

  return (
    <Formik<JoinForm>
      initialValues={{ code: "", name: "" }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={JoinFormSchema}
      onSubmit={handleFormSubmit}
    >
      {(formikProps) => (
        <Switch>
          <Route exact path={"/join/code"}>
            <Field name="code">
              {(fieldProps: FieldProps) => (
                <Code
                  onSubmit={handleCodeSubmit(formikProps)}
                  {...fieldProps}
                />
              )}
            </Field>
          </Route>
          <Route exact path={"/join/name"}>
            <Field name="name">
              {(fieldProps: FieldProps) => (
                <Name
                  onSubmit={handleNameSubmit(formikProps)}
                  {...fieldProps}
                />
              )}
            </Field>
          </Route>
          <Redirect to="/" />
        </Switch>
      )}
    </Formik>
  )
}

// TODO: try using useFormik instead of Formik component to avoid higher order func
