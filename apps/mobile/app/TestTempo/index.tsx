import { Pressable, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useTheme } from "@/lib/theme/provider";

export default function index() {
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
                onPress={() => router.push("/TestTempo/TestVerificationTempo")}
                style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "blue",
                    borderRadius: 5,
                }}
            >
                <Text style={{ color: "white" }}>Test Verification</Text>
            </Pressable>
        </View>
    )

}