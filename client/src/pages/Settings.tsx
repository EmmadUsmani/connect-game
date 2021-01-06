import React from "react";

import { Page, Label, Picker, Button, Link } from "../components";

const Settings: React.FC = () => {
  return (
    <Page>
      <Label>Board size</Label>
      <Picker />
      <Label>Turn timer</Label>
      <Picker />
      <Label>Powerups</Label>
      <Picker />
      <Link to="/room">
        <Button style={{ marginTop: 10 }}>Create Game</Button>
      </Link>
    </Page>
  );
};

export default Settings;
