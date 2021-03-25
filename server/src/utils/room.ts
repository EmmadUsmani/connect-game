import {
  GameRoom,
  GameRooms,
  GameCodeLen,
  GameCodeChars,
  GameColor,
  GamePlayer,
} from "@connect-game/shared";

export function generateRoomCode(rooms: GameRooms): string {
  let code = "";
  for (let i = 0; i < GameCodeLen; i++) {
    const char = randomFrom(GameCodeChars);
    code += char;
  }
  return code in rooms ? generateRoomCode(rooms) : code;
}

export function generateColor(room: GameRoom): GameColor {
  const availableColors = new Set<GameColor>();

  for (const color in GameColor) {
    availableColors.add(GameColor[color as keyof typeof GameColor]);
  }

  for (const player of room.players) {
    availableColors.delete(player.color);
  }

  return randomFrom(Array.from(availableColors));
}

export function reassignHost(room: GameRoom): GamePlayer {
  return randomFrom(room.players);
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
