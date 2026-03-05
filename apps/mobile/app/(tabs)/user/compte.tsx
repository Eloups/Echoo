import React from "react";
import { View, Image, ScrollView } from "react-native";
import AppText from "@/lib/components/global/appText";
import { BtnConnexion } from "@/lib/components/global/BtnConnexion";
import { useAuthHook } from '@/hook/authHook';
import { useTheme } from "@/lib/theme/provider";
import { useGlobalHook } from "@/hook";
import UpdateUserProfilModal from "@/lib/components/updateUserProfilModal";

const pp = require("../../../assets/img/pp.jpg");

export default function CompteScreen() {
    const { logout } = useAuthHook();
    const { user } = useGlobalHook();
    const { theme } = useTheme();

    const [visibelModifProfil, setVisibleModifProfil] = React.useState(false);

    function handleLogout() {
        logout();
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: theme.colors.background
            }}
            contentContainerStyle={{
                alignItems: "center",
                flexDirection: "column",
                paddingHorizontal: 20,
                paddingBottom: 90,
            }}
        >
            <View style={{ width: "100%", height: 100, flexDirection: "row", gap: 20, alignItems: "center", marginTop: 40 }}>
                <View style={{ width: 100, height: 100 }}>
                    <Image
                        source={user?.image ? { uri: user.image } : pp}
                        style={{ width: "100%", height: "100%", borderRadius: 50 }}
                    />
                </View>
                <View style={{ flex: 1, height: "100%", justifyContent: "center" }}>
                    <AppText size="3xl" >{user?.username || "Test"}</AppText>
                </View>
            </View>

            <View style={{ width: "100%", marginTop: 20 }} >
                <BtnConnexion title="Modifier le profil" onClick={() => { setVisibleModifProfil(true); }} />
            </View>

            <View style={{ width: "100%", marginTop: 20 }} >
                <BtnConnexion title="Se déconnecter" onClick={() => { handleLogout() }} />
            </View>
           
            <UpdateUserProfilModal
                visible={visibelModifProfil}
                onClose={() => setVisibleModifProfil(false)}
                onSubmit={() => { console.log("Modification du profil"); }}
            />
        </ScrollView >
    )
}