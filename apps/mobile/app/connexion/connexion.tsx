import React from "react";
import { View } from "react-native";
import { TextInputGlobal } from "@/lib/components/global/TextInput";
import EchoCompleteLogo from "@/assets/img/EchoCompleteLogo";
import AppText from "@/lib/components/global/appText";
import { BtnConnexion } from "@/lib/components/global/BtnConnexion";
import { useRouter } from "expo-router";

export default function ConnexionScreen() {
    const router = useRouter();

    const [pseudo, setPseudo] = React.useState<string>("")
    const [mdp, setMdp] = React.useState<string>("")


    function handleConect() {
        if (pseudo.trim() !== ""  && mdp.trim() !== "") {
            // pass pour le dev Tempo 
            if (pseudo == "Admin" && mdp == "Admin") {
                router.push("/(tabs)/home");
                return;
            }
        }
        else {
            let messageError = "";
            if (pseudo.trim() === "") {
                messageError += "Le pseudo ne peut pas être vide.\n";
            }
            if (mdp.trim() === "") {
                messageError += "Le mot de passe ne peut pas être vide.\n";
            }
        }
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
            <EchoCompleteLogo height={40} width={159} />

            <View style={{ width: "100%", height: "100%", marginTop: 100 }}>
                <View style={{ alignItems: "center" }}>
                    <AppText size="3xl" weight="bold">Connexion</AppText>
                </View>
                <View
                    style={{
                        flex: 1,
                        gap: 7,
                        alignItems: "center"
                    }}
                >
                    <View style={{ width: "100%" }}>
                        <TextInputGlobal text={pseudo} setText={setPseudo} label="Pseudo" />
                    </View>
                    <View style={{ width: "100%" }}>
                        <TextInputGlobal text={mdp} setText={setMdp} label="Mot de passe" star={true} />
                    </View>
                    <AppText color="primary" size="lg" onPress={() => { console.log("Mdp oublié click") }}>Mot de passe oublié ?</AppText>
                    <View style={{ width: "100%", height: 50 }}>
                        <BtnConnexion title="Se connecter" onClick={() => { console.log("Se connecter click"); handleConect() }} />
                    </View>
                    <View style={{ width: "100%", alignItems: "center", marginTop: 33 }}>
                        <AppText color="primary" size="lg" onPress={() => { console.log("Pas de compte click"); router.push("/connexion/inscription") }}>Pas de compte ? S'inscrire</AppText>
                    </View>
                </View>
            </View>
        </View>
    );


}