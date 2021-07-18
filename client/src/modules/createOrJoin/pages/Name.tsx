import React from "react"

import { Text, Input, Button } from "components"
import { Page, Spacer } from "components/layout"
import { useTheme } from "context"
import { useOnKeyDown } from "hooks"

interface NameProps {
  value: string
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  onSubmit(): void
}

export function Name({ value, onChange, onSubmit }: NameProps) {
  const theme = useTheme()
  useOnKeyDown("Enter", onSubmit)

  return (
    <Page>
      <Text size={theme.sizes.text.large}>Enter your name</Text>
      <Spacer size={60} />
      <Input autoFocus={true} type="text" value={value} onChange={onChange} />
      <Spacer size={20} />
      <Button disabled={!value} onClick={onSubmit}>
        Continue
      </Button>
    </Page>
  )
}
