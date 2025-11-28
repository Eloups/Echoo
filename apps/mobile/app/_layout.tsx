import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { ThemeProvider, useTheme } from "@/lib/theme/provider";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

function ThemedRoot() {
  const { theme } = useTheme();
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme.colors.background);
    NavigationBar.setButtonStyleAsync(
      theme.name === "dark" ? "light" : "dark"
    );
  }, [theme]);
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={theme.name === "dark" ? "light-content" : "dark-content"} />
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="bases/connexion" options={{ headerShown: false }} />
      </Stack>
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
