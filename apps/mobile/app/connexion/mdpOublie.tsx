import React from "react";
import { View } from "react-native";
import { TextInputGlobal } from "@/lib/components/global/TextInput";
import EchoCompleteLogo from "@/assets/img/EchoCompleteLogo";
import AppText from "@/lib/components/global/appText";
import { BtnConnexion } from "@/lib/components/global/BtnConnexion";
import { useRouter } from "expo-router";
import { useAuthHook } from '@/hook/authHook';
import { emailSchema } from "@/lib/validations/authSchema";

export default function MdpOublieScreen() {
    const router = useRouter();
    const { sendResetPassword, isLoading, authError } = useAuthHook();
    const [email, setEmail] = React.useState<string>("");
    const [waitResetPassword, setWaitResetPassword] = React.useState<boolean>(false);
    const [validationError, setValidationError] = React.useState<string>("");

    function handleSendEmail() {
        // Réinitialiser les erreurs de validation
        setValidationError("");

        try {
            // Valider l'email
            emailSchema.parse(email.trim());

            // Si validation réussie, envoyer l'email de réinitialisation
            if (!waitResetPassword) {
                setWaitResetPassword(true);
            }
            sendResetPassword(email.trim());
        }
        catch (error: any) {
            // Gérer les erreurs de validation
            if (error.errors?.[0]?.message) {
                setValidationError(error.errors[0].message);
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
                        {validationError && (
                            <AppText color="error" size="sm">{validationError}</AppText>
                        )}
                    </View>

                    <View style={{ width: "100%", height: 50 }}>
                        <BtnConnexion title="Envoyer le mail" onClick={() => { handleSendEmail() }} isLoading={isLoading} />
                    </View>

                    {waitResetPassword ? (
                        <View style={{ width: "100%", paddingLeft: 20, paddingRight: 20, alignItems: "center" }}>
                            <AppText size="md" align="center">Un email de réinitialisation a été envoyé. Veuillez vérifier votre boîte de réception.</AppText>
                            <AppText size="md" align="center">Si c&apos;est fait, reconnectez-vous.</AppText>
                            <AppText color="primary" size="lg" onPress={() => { router.push("/connexion/connexion") }}>Se connecter</AppText>
                        </View>
                    ) : null}

                    {authError ? (
                        <AppText color="error" size="md">{authError}</AppText>
                    ) : null}
                    <View style={{ width: "100%", alignItems: "center", marginTop: 33 }}>
                        <AppText color="primary" size="lg" onPress={() => { router.push("/connexion/inscription") }}>Pas de compte ? S&apos;inscrire</AppText>
                    </View>
                </View>
            </View>
        </View>
    );


}