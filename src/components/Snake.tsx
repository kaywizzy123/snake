import { CELL_SIZE, SEGMENT_SIZE } from "@/constants/game";
import { COLORS } from "@/styles/colors";
import { Coordinate } from "@/types/types";
import { JSX } from "react";
import { StyleSheet, View } from "react-native";

interface SnakeProps {
  snake: Coordinate[];
}

export default function Snake({ snake }: SnakeProps): JSX.Element {
  return (
    <>
      {snake.map((segment: Coordinate, index: number) => {
        const segmentStyle = {
          left: segment.x * CELL_SIZE,
          top: segment.y * CELL_SIZE,
        };
        return <View key={index} style={[styles.snake, segmentStyle]}></View>;
      })}
    </>
  );
}

const styles = StyleSheet.create({
  snake: {
    width: SEGMENT_SIZE,
    height: SEGMENT_SIZE,
    borderRadius: SEGMENT_SIZE / 2,
    backgroundColor: COLORS.primary,
    position: "absolute",
  },
});
