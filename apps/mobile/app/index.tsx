import { Pressable, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useTheme } from "@/lib/theme/provider";

export default function Index() {
  const router = useRouter();
  const { theme, setThemeByName } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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

      <Pressable
        onPress={() => setThemeByName("light")}
        style={{
          backgroundColor: theme.colors.primary,
          padding: 12,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: theme.colors.primaryLight,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: theme.colors.text, textAlign: "center" }}>Thème clair</Text>
      </Pressable>

      <Pressable
        onPress={() => setThemeByName("dark")}
        style={{
          backgroundColor: theme.colors.primary,
          padding: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: theme.colors.background, textAlign: "center" }}>
          Thème sombre
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/TestTempo")}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Test Titi</Text>
      </Pressable>
    </View>
  );
}
