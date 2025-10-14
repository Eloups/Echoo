// import { Stack } from "expo-router";
// import { Colors } from "@/styles/constants/colors";
// import { View } from "react-native";

// export default function RootLayout() {
//   return (
//     <View style={{backgroundColor: Colors.background}}>
//       <Stack screenOptions={{ headerShown: false }} />
//     </View>);
// }

import { Stack } from "expo-router";
import { View, StatusBar } from "react-native";
import { ThemeProvider, useTheme } from "@/lib/theme/provider";

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
      />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}
