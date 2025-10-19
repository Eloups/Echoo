import React from "react";
import { View, Image, Text, } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import { TextInputGlobal } from "@/lib/components/global/TextInput";
import { StyleSheet } from "react-native";
import EchoCompleteLogo from "../../assets/img/EchoCompleteLogo";
import AppText from "@/lib/components/global/appText";
import { BtnConnexion } from "@/lib/components/global/BtnConnexion";

const logoEchooComplet = require("../../assets/img/EchoCompleteLogo.svg");
export default function ConnexionScreen() {
    const [text, setText] = React.useState("")
    const [text2, setText2] = React.useState("")

    {/* voir https://docs.expo.dev/guides/keyboard-handling/ */ }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: 100,
                gap: 40,
            }}
        >
            <EchoCompleteLogo height={40} width={159} />

            <View style={{ width: "100%", height: "100%", padding: 20, }}>
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                    <AppText size="3xl" weight="bold">Connexion</AppText>
                </View>
                <View
                    style={{
                        flex: 1,
                        gap: 6,
                        alignItems: "center",

                    }}
                >
                    <View style={{ width: "100%" }}>
                        <TextInputGlobal text={text} setText={setText} label="Pseudo" />
                    </View>
                    <View style={{ width: "100%" }}>
                        <TextInputGlobal text={text2} setText={setText2} label="Mot de passe" star={true} />
                    </View>
                    <AppText color="primary" size="lg" onPress={() => { console.log("Mdp oublié click") }}>Mot de passe oublié ?</AppText>
                    <View style={{ width: "100%", height: 50 }}>
                        <BtnConnexion title="Se connecter" onClick={() => { console.log("Se connecter click") }} />
                    </View>
                    <AppText color="primary" size="lg" onPress={() => { console.log("Pas de compte click") }}>Pas de compte ? S'inscrire</AppText>
                </View>
            </View>
        </View>

    );


}