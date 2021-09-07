import { MaxNameLen } from "@connect-game/shared"
import { FieldInputProps, FieldMetaProps } from "formik"
import React from "react"

import { Text, Input, Button } from "components"
import { Page, Spacer } from "components/layout"
import { useTheme } from "context"
import { useOnKeyDown } from "hooks"

interface NameProps {
  field: FieldInputProps<string>
  meta: FieldMetaProps<string>
  onSubmit(): void
}

export function Name({ field, meta, onSubmit }: NameProps) {
  const theme = useTheme()
  useOnKeyDown("Enter", onSubmit)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= MaxNameLen) {
      field.onChange(event)
    }
  }

  return (
    <Page>
      <Text size={theme.sizes.text.large}>Enter your name</Text>
      <Spacer size={60} />
      <Text size={theme.sizes.text.extraSmall}>{meta.error}</Text>
      <Input
        autoFocus={true}
        {...field}
        spellCheck={false}
        onChange={handleChange}
      />
      <Spacer size={20} />
      <Button disabled={!field.value} onClick={onSubmit}>
        Continue
      </Button>
    </Page>
  )
}
