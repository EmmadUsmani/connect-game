import { GameSettings, Options } from "@connect-game/shared"

import { boardSizeToStr, strToBoardSize } from "../utils"

import { Label, Picker, Button } from "components"
import { Page } from "components/layouts"
import { useOnKeyDown } from "hooks"

interface SettingsProps {
  settings: GameSettings
  onChange(newSettings: GameSettings): void
  onSubmit(): void
}

export function Settings({ settings, onChange, onSubmit }: SettingsProps) {
  useOnKeyDown("Enter", onSubmit)

  return (
    <Page>
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
      {/* <Label>Turn timer</Label>
      <Picker
        value={settings.turnTimer}
        options={GameOptions.turnTimers}
        onChange={(event) =>
          onChange({ ...settings, turnTimer: parseInt(event.target.value) })
        }
      /> */}
      <Button style={{ marginTop: 10 }} onClick={onSubmit}>
        Create Game
      </Button>
    </Page>
  )
}
