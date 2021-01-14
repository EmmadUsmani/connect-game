import React, { useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

import {
  GameColor,
  GameDefaultSettings,
  GameMaxNameLen,
  GameSettings,
} from "@connect-game/shared";
import { useGame } from "../context";
import { Name, Settings } from ".";

const Create: React.FC = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { createRoom } = useGame();

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

  const handleSettingsSubmit = (): void => {
    createRoom({ name, color: GameColor.Blue }, settings);
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
