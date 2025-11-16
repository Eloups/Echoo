import React from "react";
import { View } from "react-native";
import { TextInputGlobal } from "@/lib/components/global/TextInput";
import { ProfilImagePickerModal } from "@/lib/components/global/profilImagePickerModal";
import EchooSmallLogo from "@/assets/img/EchooSmallLogo";
import AppText from "@/lib/components/global/appText";
import { BtnConnexion } from "@/lib/components/global/BtnConnexion";
import { useRouter } from "expo-router";
import { verifEmail, verifMdp, verifPseudo } from "@/lib/utils/verifications";
import ErrorModal from "@/lib/components/global/ErrorModal";
import useGlobalHook from "@/hook/globalHook";


export default function InscriptionScreen() {
    const router = useRouter();
    const{ setError } = useGlobalHook();

    const [pseudo, setPseudo] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mdp, setMdp] = React.useState("");
    const [mdpConf, setMdpConf] = React.useState("");
    const [imagePdp, setImagePdp] = React.useState<string | null>(null);

    const [errorMessage, setErrorMessage] = React.useState<string>("");

    function verifCreation() {
        let messageError = "";
        messageError += verifEmail(email);
        messageError += verifPseudo(pseudo);
        messageError += verifMdp(mdp, mdpConf);

        if (messageError !== "") {
            setErrorMessage(messageError);
            console.log(messageError);
        }
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
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <EchooSmallLogo height={64} width={40} />
                <AppText size="2xl" weight="bold">
                    Inscription
                </AppText>
            </View>

            <View style={{ width: "100%", paddingTop: 20 }}>
                <TextInputGlobal text={pseudo} setText={setPseudo} label="Pseudo*" />
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
            </View>
            <View style={{ width: "100%" }}>
                <TextInputGlobal
                    text={mdp}
                    setText={setMdp}
                    label="Mot de passe*"
                    star={true}
                />
            </View>
            <View style={{ width: "100%" }}>
                <TextInputGlobal
                    text={mdpConf}
                    setText={setMdpConf}
                    label="Confirmer le mot de passe*"
                    star={true}
                />
            </View>

            <View style={{ width: "100%", height: 50, marginTop: 20 }}>
                <BtnConnexion
                    title="Créer mon compte"
                    onClick={() => {
                        verifCreation();
                        console.log("Créer mon compte");
                    }}
                />
            </View>

            <AppText
                color="primary"
                size="lg"
                onPress={() => {
                    router.push("/bases/connexion/connexion");
                }}
            >
                Déjà un compte ? Se connecter
            </AppText>

            <ErrorModal message={errorMessage} onClose={() => { setErrorMessage("") }} />

        </View>
    );
}
