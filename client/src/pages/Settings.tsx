import React from "react";

import { Page, Label, Picker, Button, Link } from "../components";

const boardOptions: [string, string][] = [
  ["7 columns x 6 rows", "7x6"],
  ["5 columns x 5 rows", "5x5"],
  ["12 columns x 12 rows", "12x12"],
];

const timerOptions: [string, string][] = [
  ["30 seconds", "30"],
  ["15 seconds", "15"],
  ["None", "none"],
];

const powerupOptions: [string, string][] = [
  ["None", "none"],
  ["Limited", "limited"],
  ["Full", "full"],
];

const Settings: React.FC = () => {
  return (
    <Page>
      <Label>Board size</Label>
      <Picker options={boardOptions} />
      <Label>Turn timer</Label>
      <Picker options={timerOptions} />
      <Label>Powerups</Label>
      <Picker options={powerupOptions} />
      <Link to="/room">
        <Button style={{ marginTop: 10 }}>Create Game</Button>
      </Link>
    </Page>
  );
};

export default Settings;

// TODO: create type (enum perhaps) for well defined options values
