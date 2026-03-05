import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { StatusBar, View, Platform } from "react-native";
import { ThemeProvider, useTheme } from "@/lib/theme/provider";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
// import useGlobalHook from '@/hook/globalHook';
import useAuthHook from "@/hook/authHook";


function ThemedRoot() {

  const { theme } = useTheme();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(theme.colors.background);
      NavigationBar.setButtonStyleAsync(
        "dark"
      );
    }
  }, [theme]);

  // Vérifier le token au démarrage de l'application 
  //////////// METTRE DANS L'APLICATION FINALE ICIIIIIIII
  useEffect(() => {
    if (!rootNavigationState?.key) {
      return;
    }

    (async () => {
      try {
        const expired = await useAuthHook.getState().checkToken();
        if (expired) {
          router.replace('/connexion/connexion');
        }
      } catch (e) {
        console.error('checkToken error', e);
      }
    })();
  }, [rootNavigationState?.key, router]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="connexion/connexion" options={{ headerShown: false }} />
        <Stack.Screen name="connexion/inscription" options={{ headerShown: false }} />
        <Stack.Screen name="connexion/mdpOublie" options={{ headerShown: false }} />
        <Stack.Screen name="connexion/compte" />
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
