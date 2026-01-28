import React from "react";
import { View } from "react-native";
import { TextInputGlobal } from "@/lib/components/global/TextInput";
import EchoCompleteLogo from "@/assets/img/EchoCompleteLogo";
import AppText from "@/lib/components/global/appText";
import { BtnConnexion } from "@/lib/components/global/BtnConnexion";
import { useRouter } from "expo-router";
import useAuthHook from '@/hook/authHook';
import { useTheme } from "@/lib/theme/provider";
import { useGlobalHook } from "@/hook";

export default function CompteScreen() {
    const router = useRouter();
    const { logout } = useAuthHook();
    const { user } = useGlobalHook();
    const { theme } = useTheme();
    
    console.log("user = ", user);

    function handleLogout() {
        logout();
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: 120,
                paddingHorizontal: 20,
                gap: 40,
            }}
        >
            <BtnConnexion title="Se déconnecter" color={theme.colors.error} onClick={() => { handleLogout() }} />

        </View>
    )
}