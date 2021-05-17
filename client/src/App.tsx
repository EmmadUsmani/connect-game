import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Home, Create, Join, Room, Play } from "./pages";
import { ProtectedRoute } from "./components";
// import { useGame } from "./context";

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // const { clearState } = useGame();

  const handleLoad = (): void => {
    setIsLoaded(true);
    // clearState();
  };

  return (
    <Switch>
      <ProtectedRoute accessible={isLoaded} path="/create">
        <Create />
      </ProtectedRoute>
      <ProtectedRoute accessible={isLoaded} path="/join">
        <Join />
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
