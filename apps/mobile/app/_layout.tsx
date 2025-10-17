import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { ThemeProvider, useTheme } from "@/lib/theme/provider";
import { useFonts } from "expo-font";
import AppHeader from "@/lib/components/appHeader";

function ThemedRoot() {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={theme.name === "dark" ? "light-content" : "dark-content"} />
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }} />
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Kanit-Regular": require("@/assets/fonts/Kanit-Regular.ttf"),
    "Kanit-Bold": require("@/assets/fonts/Kanit-Bold.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <ThemedRoot />
    </ThemeProvider>
  );
}
