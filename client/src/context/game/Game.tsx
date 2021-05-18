import React, { createContext, useContext, useEffect, useReducer } from "react";

import {
  Events,
  EventData,
  GameSettings,
  GameState,
  InitialGameState,
} from "@connect-game/shared";
import { gameReducer } from "./reducer";
import { joinRoom } from "./actions";
import { server } from "../../services";

interface GameCtxInterface {
  gameState: GameState;
  createRoom(settings: GameSettings, hostName: string): void;
}

export const GameContext = createContext<GameCtxInterface>({
  gameState: InitialGameState,
  createRoom: (_, _2) => null,
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, InitialGameState);

  const createRoom = (settings: GameSettings, hostName: string): void => {
    server.createRoom(settings, hostName);
  };

  /* Register listeners */
  useEffect(() => {
    server.listen(Events.RoomJoined, (data: EventData[Events.RoomJoined]) => {
      dispatch(joinRoom(data));
    });
    return server.removeAllListeners;
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        createRoom,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
