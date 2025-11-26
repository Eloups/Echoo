import { Stack } from "expo-router";
import { StatusBar, View, Platform  } from "react-native";
import { ThemeProvider, useTheme } from "@/lib/theme/provider";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

function ThemedRoot() {
  const { theme } = useTheme();
  if (Platform.OS == "android") {
    useEffect(() => {
      NavigationBar.setBackgroundColorAsync(theme.colors.background);
      NavigationBar.setButtonStyleAsync(
        theme.name === "dark" ? "light" : "dark"
      );
    }, [theme]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={theme.name === "dark" ? "light-content" : "dark-content"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="connexion/connexion" options={{ headerShown: false }} />
        <Stack.Screen name="connexion/inscription" options={{ headerShown: false }} />
        <Stack.Screen name="TestTempo/index" />
        <Stack.Screen name="TestTempo/TestVerificationTempo" />

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
