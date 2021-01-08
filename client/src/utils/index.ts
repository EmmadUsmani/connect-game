import { GameSettings } from "../models";

/* Converts boardSize to str for use in Picker */
export function boardSizeToStr(boardSize: GameSettings["boardSize"]) {
  return boardSize.join(",");
}

export function strToBoardSize(str: string) {
  return str
    .split(",")
    .map((num) => parseInt(num)) as GameSettings["boardSize"];
}
