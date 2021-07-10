import React, { useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

import {
  GameSettings,
  DefaultSettings,
  MaxNameLen,
} from "@connect-game/shared";
import { useGame } from "../context";
import { Name, Settings } from ".";

const Create: React.FC = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { createRoom } = useGame();

  const [name, setName] = useState<string>("");
  const [settings, setSettings] = useState<GameSettings>(DefaultSettings);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newName = event.target.value;
    if (newName.length > MaxNameLen) return;
    setName(newName);
  };

  const handleNameSubmit = (): void => {
    history.push(`${match.path}/settings`);
  };

  const handleSettingsChange = (newSettings: GameSettings): void => {
    setSettings(newSettings);
  };

  const handleSettingsSubmit = (): void => {
    createRoom(settings, name);
    history.push("/room");
  };

  return (
    <Switch>
      <Route exact path={`${match.path}/name`}>
        <Name
          value={name}
          onChange={handleNameChange}
          onSubmit={handleNameSubmit}
        />
      </Route>
      <Route exact path={`${match.path}/settings`}>
        <Settings
          settings={settings}
          onChange={handleSettingsChange}
          onSubmit={handleSettingsSubmit}
        />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Create;
