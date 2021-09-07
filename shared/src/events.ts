import { GameSettings, GamePlayer, GameRoom } from "./types"

export enum Events {
  CreateRoom = "CreateRoom",
  GetRoom = "GetRoom",
  RoomFound = "RoomFound",
  RoomNotFound = "RoomNotFound",
  InProgress = "InProgress",
  JoinRoom = "JoinRoom",
  NameTaken = "NameTaken",
  RoomJoined = "RoomJoined",
  PlayerJoined = "PlayerJoined",
  LeaveRoom = "LeaveRoom",
  PlayerLeft = "PlayerLeft",
  ReassignHost = "ReassignHost",
  StartGame = "StartGame",
  EndGame = "EndGame",
  PlacePiece = "PlacePiece",
}

export interface EventData {
  CreateRoom: {
    settings: GameSettings
    hostName: string
  }
  GetRoom: {
    code: string
  }
  JoinRoom: {
    code: string
    playerName: string
  }
  RoomJoined: {
    room: GameRoom
    player: GamePlayer
  }
  PlayerJoined: {
    player: GamePlayer
  }
  PlayerLeft: {
    playerName: string
  }
  ReassignHost: {
    playerName: string
  }
  PlacePiece: {
    colNum: number
    rowNum: number
  }
}
