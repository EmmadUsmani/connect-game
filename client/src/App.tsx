import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Home, Create, Room, Play } from "./pages";
import { ProtectedRoute } from "./components";

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleLoad = (): void => {
    setIsLoaded(true);
  };

  return (
    <Switch>
      <ProtectedRoute accessible={isLoaded} path="/create">
        <Create />
      </ProtectedRoute>
      <ProtectedRoute accessible={isLoaded} path="/room">
        <Room />
      </ProtectedRoute>
      <ProtectedRoute accessible={isLoaded} path="/play">
        <Play />
      </ProtectedRoute>
      <Route exact path="/">
        <Home onLoad={handleLoad} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
