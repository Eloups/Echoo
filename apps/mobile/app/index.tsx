import { Pressable, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { Stack, useRouter, Redirect } from "expo-router";
import { useTheme } from "@/lib/theme/provider";

export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}

export function DebugScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Pressable
        onPress={() => router.push("/connexion/connexion")}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Début application</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/(tabs)/home")}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Accueil</Text>
      </Pressable>

    </View>
  );
}
