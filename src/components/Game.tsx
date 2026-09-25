import { CELL_SIZE, SEGMENT_SIZE } from "@/constants/game";
import { COLORS } from "@/styles/colors";
import {
  Coordinate,
  Direction,
  GameBounds,
  GestureEventType,
} from "@/types/types";
import { checkGameOver } from "@/utils/checkGameOver";
import { useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Snake from "./Snake";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const BORDER_WIDTH = 12;
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game() {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameBounds, setGameBounds] = useState<GameBounds | null>(null);

  // Derive the grid bounds from the measured size of the play area
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const innerWidth = width - BORDER_WIDTH * 2;
    const innerHeight = height - BORDER_WIDTH * 2;
    setGameBounds({
      xMin: 0,
      xMax: Math.floor((innerWidth - SEGMENT_SIZE) / CELL_SIZE),
      yMin: 0,
      yMax: Math.floor((innerHeight - SEGMENT_SIZE) / CELL_SIZE),
    });
  };

  const moveSnake = () => {
    if (!gameBounds) return; // wait until the play area has been measured

    const snakeHead = snake[0];
    const newHead = { ...snakeHead }; // creating a copy

    // game over
    if (checkGameOver(snakeHead, gameBounds)) {
      setIsGameOver((prev) => !prev);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;

      case Direction.Down:
        newHead.y += 1;
        break;

      case Direction.Left:
        newHead.x -= 1;
        break;

      case Direction.Right:
        newHead.x += 1;
        break;

      default:
        break;
    }

    //if eats food grow snake

    setSnake([newHead, ...snake.slice(0, -1)]);
  };

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused, gameBounds]);

  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    console.log(translationX, translationY);

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        //moving right
        setDirection(Direction.Right);
      } else {
        // moving left
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        //moving down
        setDirection(Direction.Down);
      } else {
        //moving up
        setDirection(Direction.Up);
      }
    }
  };
  return (
    <>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <SafeAreaView style={styles.container}>
          <View style={styles.boundaries} onLayout={handleLayout}>
            <Snake snake={snake} />
          </View>
        </SafeAreaView>
      </PanGestureHandler>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  boundaries: {
    flex: 1,
    borderColor: COLORS.primary,
    borderWidth: BORDER_WIDTH,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: COLORS.background,
  },
});
