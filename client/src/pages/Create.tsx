import React, { useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import { Name, Settings } from "./";
import { GameDefaultSettings, GameMaxNameLen, GameSettings } from "../models";

const Create: React.FC = () => {
  const history = useHistory();
  const match = useRouteMatch();

  const [name, setName] = useState<string>("");
  const [settings, setSettings] = useState<GameSettings>(GameDefaultSettings);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newName = event.target.value;
    if (newName.length > GameMaxNameLen) return;
    setName(newName);
  };

  const handleNameSubmit = (): void => {
    if (!name) return;
    history.push(`${match.path}/settings`);
  };

  const handleSettingsChange = (newSettings: GameSettings): void => {
    setSettings(newSettings);
  };

  const handleCreate = (): void => {
    console.log("creating room!");
    history.push("/room");
  };

  return (
    <Switch>
      <Route path={`${match.path}/name`}>
        <Name
          value={name}
          onChange={handleNameChange}
          onSubmit={handleNameSubmit}
        />
      </Route>
      <Route path={`${match.path}/settings`}>
        <Settings
          settings={settings}
          onChange={handleSettingsChange}
          onSubmit={handleCreate}
        />
      </Route>
    </Switch>
  );
};

export default Create;
