export enum Color {
  Blue = "#8CB1F8",
  Green = "#97DC8F",
}

export interface Player {
  name: string;
  color: Color;
}

export type Piece = Player | null;

export type Column = Piece[];

export type Board = Column[];
