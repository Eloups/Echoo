import { Pressable, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable 
        onPress={() => router.push("/bases/connexion")}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Début aplication</Text>
      </Pressable>
    
    
    </View>
  );
}
