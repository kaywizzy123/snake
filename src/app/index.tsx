import Game from "@/components/Game";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Game />
    </GestureHandlerRootView>
  );
}
