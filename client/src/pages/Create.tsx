import React, { useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

import { Name, Settings } from "./";
import { GameDefaultSettings, GameMaxNameLen, GameSettings } from "../models";

interface CreateProps {
  onCreate(name: string, settings: GameSettings): void;
}

const Create: React.FC<CreateProps> = ({ onCreate }) => {
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
          onSubmit={() => onCreate(name, settings)}
        />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Create;
