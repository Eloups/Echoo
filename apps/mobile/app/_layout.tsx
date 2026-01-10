import { Stack } from "expo-router";
import { StatusBar, View, Platform } from "react-native";
import { ThemeProvider, useTheme } from "@/lib/theme/provider";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import useGlobalHook from '@/hook/globalHook';

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

  // Vérifier le token au démarrage de l'application 
  //////////// METTRE DANS L'APLICATION FINALE ICIIIIIIII
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await useGlobalHook.getState().checkToken();
  //     } catch (e) {
  //       console.error('checkToken error', e);
  //     }
  //   })();
  // }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={theme.name === "dark" ? "light-content" : "dark-content"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="connexion/connexion" options={{ headerShown: false }} />
        <Stack.Screen name="connexion/inscription" options={{ headerShown: false }} />

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
