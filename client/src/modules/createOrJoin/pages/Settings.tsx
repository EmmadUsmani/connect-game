import { GameSettings, Options } from "@connect-game/shared"
import { FieldHelperProps, FieldInputProps } from "formik"

import { Label, Picker, Button } from "components"
import { Page, Spacer, List } from "components/layout"
import { useOnKeyDown } from "hooks"

import { boardSizeToStr, strToBoardSize } from "../utils"

interface SettingsProps {
  field: FieldInputProps<GameSettings>
  helpers: FieldHelperProps<GameSettings>
  onSubmit(): void
}

export function Settings({ field, helpers, onSubmit }: SettingsProps) {
  useOnKeyDown("Enter", onSubmit)

  return (
    <Page>
      <List spacing={20}>
        <>
          <Label>Board size</Label>
          <Picker
            options={Options.boardSizes.map(({ label, value }) => ({
              label,
              value: boardSizeToStr(value),
            }))}
            value={boardSizeToStr(field.value.boardSize)}
            onChange={(event) =>
              helpers.setValue({
                ...field.value,
                boardSize: strToBoardSize(event.target.value),
              })
            }
          />
        </>
        <>
          <Label>Win condition</Label>
          <Picker
            options={Options.winConditions}
            value={field.value.winCondition}
            onChange={(event) =>
              helpers.setValue({
                ...field.value,
                winCondition: parseInt(event.target.value),
              })
            }
          />
        </>
      </List>
      <Spacer size={30} />
      <Button onClick={onSubmit}>Create Game</Button>
    </Page>
  )
}
