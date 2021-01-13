export enum EventNames {
  CreateRoom = "CreateRoom",
}

/* TODO: consider using Game types instead of redefining things like 
board size */
export interface EventData {
  CreateRoom: {
    numCols: number;
    numRows: number;
    winCondition: number;
  };
}
