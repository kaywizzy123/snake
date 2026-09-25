import { COLORS } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { JSX } from "react/jsx-runtime";

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

export default function GameOverScreen({
  score,
  onRestart,
}: GameOverScreenProps): JSX.Element {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Game Over</Text>
        <Text style={styles.scoreLabel}>Your score</Text>
        <Text style={styles.score}>{score}</Text>

        <TouchableOpacity style={styles.button} onPress={onRestart}>
          <Ionicons name="reload" size={22} color={COLORS.background} />
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(54, 83, 20, 0.6)",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  card: {
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderColor: COLORS.primary,
    borderWidth: 6,
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 16,
    color: COLORS.primary,
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.tetiary,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.background,
  },
});
