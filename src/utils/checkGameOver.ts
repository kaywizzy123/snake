import { Coordinate, GameBounds } from "@/types/types";

export const checkGameOver = (
  snakeHead: Coordinate,
  boundaries: GameBounds,
): boolean => {
  return (
    snakeHead.x < boundaries.xMin ||
    snakeHead.x > boundaries.xMax ||
    snakeHead.y < boundaries.yMin ||
    snakeHead.y > boundaries.yMax
  );
};
