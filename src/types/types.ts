export interface GestureEventType {
  nativeEvent: { translationX: number; translationY: number };
}

export interface Coordinate {
  x: number;
  y: number;
}

export enum Direction {
  Right,
  Up,
  Left,
  Down,
}

export interface GameBounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}
