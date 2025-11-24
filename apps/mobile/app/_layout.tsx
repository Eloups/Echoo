// import { Stack } from "expo-router";
// import { Colors } from "@/styles/constants/colors";
// import { View } from "react-native";

// export default function RootLayout() {
//   return (
//     <View style={{backgroundColor: Colors.background}}>
//       <Stack screenOptions={{ headerShown: false }} />
//     </View>);
// }

import { Stack, Tabs } from "expo-router";
import { View, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { ThemeProvider, useTheme } from "@/lib/theme/provider";
import { Text, TextInput } from "react-native";
import { useFonts } from "expo-font";
import useGlobalHook from "@/hook/globalHook";

function ThemedStack() {
  const { theme } = useTheme();

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
        <Stack.Screen name="bases/connexion/connexion" options={{ headerShown: false }} />
        <Stack.Screen name="bases/connexion/inscription" options={{ headerShown: false }} />
        <Stack.Screen name="TestTempo/index" />
        <Stack.Screen name="TestTempo/TestVerificationTempo" />

      </Stack>

j    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Kanit-Regular": require("@/assets/fonts/Kanit-Regular.ttf"),
    "Kanit-Bold": require("@/assets/fonts/Kanit-Bold.ttf"),
  });

  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}
