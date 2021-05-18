import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";

import {
  Events,
  EventData,
  GameSettings,
  GameState,
  InitialGameState,
} from "@connect-game/shared";
import {
  joinRoomAction,
  leaveRoomAction,
  playerJoinedAction,
  reassignHostAction,
  startGameAction,
} from "./actions";
import { gameReducer } from "./reducer";
import { server } from "../../services";

interface GameCtxInterface {
  gameState: GameState;
  createRoom(settings: GameSettings, hostName: string): void;
  joinRoom(code: string, playerName: string): void;
  leaveRoom(): void;
  startGame(): void;
}

export const GameContext = createContext<GameCtxInterface>({
  gameState: InitialGameState,
  createRoom: (_, _2) => null,
  joinRoom: (_, _2) => null,
  leaveRoom: () => null,
  startGame: () => null,
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, InitialGameState);
  const history = useHistory();

  const createRoom = (settings: GameSettings, hostName: string): void => {
    server.createRoom(settings, hostName);
  };

  const joinRoom = (code: string, playerName: string): void => {
    server.joinRoom(code, playerName);
  };

  const leaveRoom = (): void => {
    server.leaveRoom(gameState.play.you.name);
  };

  const startGame = (): void => {
    server.startGame();
    dispatch(startGameAction());
    history.push("/play"); // TODO: move to button
  };

  /* Register listeners */
  useEffect(() => {
    server.listen(Events.RoomJoined, (data: EventData[Events.RoomJoined]) => {
      dispatch(joinRoomAction(data));
    });

    server.listen(
      Events.PlayerJoined,
      (data: EventData[Events.PlayerJoined]) => {
        dispatch(playerJoinedAction(data));
      }
    );

    server.listen(Events.LeaveRoom, (data: EventData[Events.LeaveRoom]) => {
      dispatch(leaveRoomAction(data));
    });

    server.listen(
      Events.ReassignHost,
      (data: EventData[Events.ReassignHost]) => {
        dispatch(reassignHostAction(data));
      }
    );

    server.listen(Events.StartGame, () => {
      dispatch(startGameAction());
      history.push("/play");
    });

    return server.removeAllListeners;
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        createRoom,
        joinRoom,
        leaveRoom,
        startGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
