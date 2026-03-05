import React from "react";
import { View } from "react-native";
import { TextInputGlobal } from "@/lib/components/global/TextInput";
import { ProfilImagePickerModal } from "@/lib/components/global/profilImagePickerModal";
import EchooSmallLogo from "@/assets/img/EchooSmallLogo";
import AppText from "@/lib/components/global/appText";
import { BtnConnexion } from "@/lib/components/global/BtnConnexion";
import { useRouter } from "expo-router";
import useAuthHook from '@/hook/authHook';
import { emailSchema, passwordSchema, usernameSchema } from "@/lib/validations/authSchema";


export default function InscriptionScreen() {
    const router = useRouter();
    const { register, isLoading, authError } = useAuthHook();

    const [pseudo, setPseudo] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mdp, setMdp] = React.useState("");
    const [mdpConf, setMdpConf] = React.useState("");
    const [imagePdp, setImagePdp] = React.useState<string | null>(null);
    const [validationErrors, setValidationErrors] = React.useState<{ username?: string; email?: string; mdp?: string; mdpConf?: string }>({});

    function verifCreation() {
        // Réinitialiser les erreurs de validation
        setValidationErrors({});

        const errors: { username?: string; email?: string; mdp?: string; mdpConf?: string } = {};
        let hasErrors = false;

        // Valider le username
        try {
            usernameSchema.parse(pseudo.trim());
        } catch (error: any) {
            if (error.errors?.[0]?.message) {
                errors.username = error.errors[0].message;
                hasErrors = true;
            }
        }

        // Valider l'email
        try {
            emailSchema.parse(email.trim());
        } catch (error: any) {
            if (error.errors?.[0]?.message) {
                errors.email = error.errors[0].message;
                hasErrors = true;
            }
        }

        // Valider le mot de passe
        try {
            passwordSchema.parse(mdp.trim());
        } catch (error: any) {
            if (error.errors?.[0]?.message) {
                errors.mdp = error.errors[0].message;
                hasErrors = true;
            }
        }

        // Vérifier la confirmation du mot de passe
        if (mdp.trim() !== mdpConf.trim()) {
            errors.mdpConf = "Les mots de passe ne correspondent pas";
            hasErrors = true;
        }

        // Si erreurs, les afficher et arrêter
        if (hasErrors) {
            setValidationErrors(errors);
            return;
        }

        // Si validation réussie, procéder à l'inscription
        register(pseudo.trim(), email.trim(), mdp.trim(), imagePdp);
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
                paddingTop: 70,
                paddingHorizontal: 20,
            }}
        >
            <View style={{ width: "100%", height: "100%", alignItems: "center", }}>
                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <EchooSmallLogo height={40} width={65} style={{ marginRight: 14 }} />
                    <AppText size="3xl" weight="bold">
                        Inscription
                    </AppText>
                </View>

                <View style={{ width: "100%", paddingTop: 20 }}>
                    <TextInputGlobal text={pseudo} setText={setPseudo} label="Pseudo*" />
                    {validationErrors.username && (
                        <AppText color="error" size="sm">{validationErrors.username}</AppText>
                    )}
                </View>

                <View
                    style={{
                        width: "100%",
                        height: 75,
                        marginTop: 10,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        paddingLeft: 20,
                        justifyContent: "space-around",
                    }}
                >
                    <ProfilImagePickerModal imagePdp={imagePdp} setImagePdp={setImagePdp} height={74} width={74} />
                    <View
                        style={{
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <AppText
                            color="primary"
                            size="lg"
                        >
                            Ajouter une photo de profil
                        </AppText>
                    </View>
                </View>

                <View style={{ width: "100%" }}>
                    <TextInputGlobal text={email} setText={setEmail} label="Email*" />
                    {validationErrors.email && (
                        <AppText color="error" size="sm">{validationErrors.email}</AppText>
                    )}
                </View>
                <View style={{ width: "100%" }}>
                    <TextInputGlobal
                        text={mdp}
                        setText={setMdp}
                        label="Mot de passe*"
                        star={true}
                    />
                    {validationErrors.mdp && (
                        <AppText color="error" size="sm">{validationErrors.mdp}</AppText>
                    )}
                </View>
                <View style={{ width: "100%" }}>
                    <TextInputGlobal
                        text={mdpConf}
                        setText={setMdpConf}
                        label="Confirmer le mot de passe*"
                        star={true}
                    />
                    {validationErrors.mdpConf && (
                        <AppText color="error" size="sm">{validationErrors.mdpConf}</AppText>
                    )}
                </View>

                <View style={{ width: "100%", height: 50, marginTop: 20 }}>
                    <BtnConnexion
                        title="Créer mon compte"
                        onClick={() => {
                            verifCreation();
                        }}
                        isLoading={isLoading}
                    />
                </View>

                {authError ? (
                    <AppText color="error" size="md">{authError}</AppText>
                ) : null}

                <AppText
                    color="primary"
                    size="lg"
                    onPress={() => {
                        router.push("/connexion/connexion");
                    }}
                >
                    Déjà un compte ? Se connecter
                </AppText>

            </View>
        </View>
    );
}
