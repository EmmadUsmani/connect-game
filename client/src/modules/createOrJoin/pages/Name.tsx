import React from "react"

import { Text, Input, Button } from "components"
import { Page } from "components/layouts"
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
      <Text size={theme.sizes.text.large} style={{ marginBottom: 60 }}>
        Enter your name
      </Text>
      <Input autoFocus={true} type="text" value={value} onChange={onChange} />
      <Button disabled={!value} onClick={onSubmit}>
        Continue
      </Button>
    </Page>
  )
}
