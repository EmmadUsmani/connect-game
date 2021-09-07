import { GameSettings, Options } from "@connect-game/shared"

import { Label, Picker, Button } from "components"
import { Page, Spacer, List } from "components/layout"
import { useOnKeyDown } from "hooks"

import { boardSizeToStr, strToBoardSize } from ".."

interface SettingsProps {
  settings: GameSettings
  onChange(newSettings: GameSettings): void
  onSubmit(): void
}

export function Settings({ settings, onChange, onSubmit }: SettingsProps) {
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
            value={boardSizeToStr(settings.boardSize)}
            onChange={(event) =>
              onChange({
                ...settings,
                boardSize: strToBoardSize(event.target.value),
              })
            }
          />
        </>
        <>
          <Label>Win condition</Label>
          <Picker
            options={Options.winConditions}
            value={settings.winCondition}
            onChange={(event) =>
              onChange({
                ...settings,
                winCondition: parseInt(event.target.value),
              })
            }
          />
        </>
        {/* <>
          <Label>Turn timer</Label>
          <Picker
            options={GameOptions.turnTimers}
            value={settings.turnTimer}
            onChange={(event) =>
              onChange({ ...settings, turnTimer: parseInt(event.target.value) })
            }
          />
        </> */}
      </List>
      <Spacer size={30} />
      <Button onClick={onSubmit}>Create Game</Button>
    </Page>
  )
}
