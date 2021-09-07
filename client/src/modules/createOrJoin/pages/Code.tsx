import { FieldProps } from "formik"
import React from "react"

import { Text, Input, Button } from "components"
import { Page, Spacer } from "components/layout"
import { useTheme } from "context"
import { useOnKeyDown } from "hooks"

interface CodeProps {
  onSubmit(): void
}

export function Code({ onSubmit, field, meta }: CodeProps & FieldProps) {
  const theme = useTheme()
  useOnKeyDown("Enter", onSubmit)

  return (
    <Page>
      <Text size={theme.sizes.text.large}>Enter room code</Text>
      <Spacer size={60} />
      <Text size={theme.sizes.text.extraSmall}>{meta.error}</Text>
      <Input autoFocus={true} {...field} />
      <Spacer size={20} />
      <Button disabled={!field.value} onClick={onSubmit}>
        Continue
      </Button>
    </Page>
  )
}
