import React from "react";
import { View } from "react-native";
import { TextInputGlobal } from "@/lib/components/global/TextInput";
import EchoCompleteLogo from "@/assets/img/EchoCompleteLogo";
import AppText from "@/lib/components/global/appText";
import { BtnConnexion } from "@/lib/components/global/BtnConnexion";
import { useRouter } from "expo-router";
import useAuthHook from '@/hook/authHook';
import { emailSchema, passwordSchema } from "@/lib/validations/authSchema";

export default function ConnexionScreen() {
    const router = useRouter();
    const { login, isLoading, authError } = useAuthHook();
    const [email, setEmail] = React.useState<string>("");
    const [mdp, setMdp] = React.useState<string>("");
    const [validationErrors, setValidationErrors] = React.useState<{ email?: string; mdp?: string }>({});

    function handleConect() {
        // Réinitialiser les erreurs de validation
        setValidationErrors({});

        const errors: { email?: string; mdp?: string } = {};
        let hasErrors = false;

        // Valider l'email
        try {
            emailSchema.parse(email);
        } catch (error: any) {
            if (error?.issues?.[0]?.message) {
                errors.email = error.issues[0].message;
                hasErrors = true;
            }
        }

        // Valider le mot de passe
        try {
            passwordSchema.parse(mdp);
        } catch (error: any) {
            if (error?.issues?.[0]?.message) {
                errors.mdp = error.issues[0].message;
                hasErrors = true;
            }
        }

        // Si erreurs, les afficher et arrêter
        if (hasErrors) {
            console.log("Validation errors:", errors);
            setValidationErrors(errors);
            return;
        }

        // Si validation réussie, procéder à la connexion
        login(email.trim(), mdp.trim());
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
                        <TextInputGlobal text={email} setText={setEmail} label="Email" />
                        {validationErrors.email && (
                            <AppText color="error" size="sm">{validationErrors.email}</AppText>
                        )}
                    </View>
                    <View style={{ width: "100%" }}>
                        <TextInputGlobal text={mdp} setText={setMdp} label="Mot de passe" star={true} />
                        {validationErrors.mdp && (
                            <AppText color="error" size="sm">{validationErrors.mdp}</AppText>
                        )}
                    </View>
                    <AppText color="primary" size="lg" onPress={() => { router.push("/connexion/mdpOublie"); console.log("Mot de passe oublié") }}>Mot de passe oublié ?</AppText>
                    <View style={{ width: "100%", height: 50 }}>
                        <BtnConnexion title="Se connecter" onClick={() => { handleConect() }} isLoading={isLoading} />
                    </View>

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