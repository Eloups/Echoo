import React from "react";
import { View } from "react-native";
import { TextInputGlobal } from "@/lib/components/global/TextInput";
import EchoCompleteLogo from "@/assets/img/EchoCompleteLogo";
import AppText from "@/lib/components/global/appText";
import { BtnConnexion } from "@/lib/components/global/BtnConnexion";
import { useRouter } from "expo-router";
import useAuthHook from '@/hook/authHook';
import { set } from "better-auth";

export default function mdpOublieScreen() {
    const router = useRouter();
    const { sendResetPassword, isLoading, authError } = useAuthHook();
    const [email, setEmail] = React.useState<string>("");
    const [waitResetPassword, setWaitResetPassword] = React.useState<boolean>(false);

    function handleSendEmail() {
        if (email.trim() !== "") {
            // pass pour le dev Tempo ICIIIII
            if (!waitResetPassword) { setWaitResetPassword(true); }
            if (email == "A") {
                sendResetPassword("thibaultcallerand@gmail.com");
            }
            else {
                sendResetPassword(email);
            }
        }
        else {
            let messageError = "";
            if (email.trim() === "") {
                messageError += "L'email ne peut pas être vide.\n";
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
                    <AppText size="3xl" weight="bold">Mot de passe oublié</AppText>
                </View>
                <View
                    style={{
                        flex: 1,
                        gap: 10,
                        alignItems: "center"
                    }}
                >


                    <View style={{ width: "100%", paddingLeft: 20, paddingRight: 20, alignItems: "center" }}>
                        <AppText size="md" align="center">Entrer votre adresse email pour réinitialiser votre mot de passe</AppText>
                    </View>

                    <View style={{ width: "100%" }}>
                        <TextInputGlobal text={email} setText={setEmail} label="Email*" />
                    </View>

                    <View style={{ width: "100%", height: 50 }}>
                        <BtnConnexion title="Envoyer le mail" onClick={() => { handleSendEmail() }} isLoading={isLoading} />
                    </View>

                    {waitResetPassword ? (
                        <View style={{ width: "100%", paddingLeft: 20, paddingRight: 20, alignItems: "center" }}>
                            <AppText size="md" align="center">Un email de réinitialisation a été envoyé. Veuillez vérifier votre boîte de réception.</AppText>
                            <AppText size="md" align="center">Si c'est fait, reconecté vous.</AppText>
                            <AppText color="primary" size="lg" onPress={() => { router.push("/connexion/connexion") }}>Se connecter</AppText>
                        </View>
                    ) : null}
                    
                    {authError ? (
                        <AppText color="error" size="md">{authError}</AppText>
                    ) : null}
                    <View style={{ width: "100%", alignItems: "center", marginTop: 33 }}>
                        <AppText color="primary" size="lg" onPress={() => { router.push("/connexion/inscription") }}>Pas de compte ? S'inscrire</AppText>
                    </View>
                </View>
            </View>
        </View>
    );


}