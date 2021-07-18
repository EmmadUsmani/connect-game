import React from "react"

import { Text, Input, Button } from "components"
import { Page, Spacer } from "components/layouts"
import { useTheme } from "context"
import { useOnKeyDown } from "hooks"

interface CodeProps {
  value: string
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  onSubmit(): void
}

export function Code({ value, onChange, onSubmit }: CodeProps) {
  const theme = useTheme()
  useOnKeyDown("Enter", onSubmit)

  return (
    <Page>
      <Text size={theme.sizes.text.large}>Enter room code</Text>
      <Spacer size={60} />
      <Input autoFocus={true} type="text" value={value} onChange={onChange} />
      <Spacer size={20} />
      <Button disabled={!value} onClick={onSubmit}>
        Continue
      </Button>
    </Page>
  )
}
