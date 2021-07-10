import React from "react";

import { GameSettings, Options } from "@connect-game/shared";
import { Label, Picker, Button } from "../components";
import { Page } from "../components/layouts";
import { useOnKeyDown } from "../hooks";
import { boardSizeToStr, strToBoardSize } from "../utils";

interface SettingsProps {
  settings: GameSettings;
  onChange(newSettings: GameSettings): void;
  onSubmit(): void;
}

const Settings: React.FC<SettingsProps> = ({
  settings,
  onChange,
  onSubmit,
}) => {
  useOnKeyDown("Enter", onSubmit);

  return (
    <Page>
      <Label>Board size</Label>
      <Picker
        value={boardSizeToStr(settings.boardSize)}
        options={Options.boardSizes.map(({ label, value }) => ({
          label,
          value: boardSizeToStr(value),
        }))}
        onChange={(event) =>
          onChange({
            ...settings,
            boardSize: strToBoardSize(event.target.value),
          })
        }
      />
      <Label>Win condition</Label>
      <Picker
        value={settings.winCondition}
        options={Options.winConditions}
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
      <Button onClick={onSubmit} style={{ marginTop: 10 }}>
        Create Game
      </Button>
    </Page>
  );
};

export default Settings;
