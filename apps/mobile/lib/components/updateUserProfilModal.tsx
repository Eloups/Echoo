import React, { use, useState } from "react";
import {
    Modal,
    View,
    Pressable,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActionSheetIOS,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@/lib/theme/provider";
import AppText from "@/lib/components/global/appText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BtnConnexion } from "./global/BtnConnexion";
import { TextInputGlobal } from "./global/TextInput";
import useGlobalHook from "@/hook/globalHook";
import { ProfilImagePickerModal } from "./global/profilImagePickerModal";
import { router } from "expo-router";

type UpdateUserProfilModalProps = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (title: string, description: string, coverBase64: string | null) => void;
};

const pp = require("../../assets/img/pp.jpg");


export default function UpdateUserProfilModal({ visible, onClose, onSubmit }: UpdateUserProfilModalProps) {
    const { user } = useGlobalHook();
    const { theme } = useTheme();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [imagePdp, setImagePdp] = useState<string | null>(user?.image || pp);
    const [username, setUsername] = useState(user?.username || "Test");



    const handleSubmit = () => {
        if (!title.trim()) {
            Alert.alert("Erreur", "Veuillez entrer un nom pour la playlist");
            return;
        }
        onSubmit(title, description, coverImage);
        // Réinitialiser le formulaire
        setTitle("");
        setDescription("");
        setCoverImage(null);
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setCoverImage(null);
        onClose();
    };

    const handleChangeMdp = async () => {
        if (user?.email) {
            // Ici voir pour addapté je texte pour ne plus afficher "mot de passe oublié" mais "changement de mot de passe"F

            // await sendResetPassword(user.email);
            // router.push("/connexion/waitResetPassword");

            router.push("/connexion/changeMdp");
        }
        else { console.log("Aucun email associé à ce compte"); }
        console.log("Changer de mot de passe");
    }
    const handleChangeEmail = () => {
        // Le plant ici c'est de faire une vérification du nouveau mail et 
        // envoillé un mail pour dire de contacté le support
        // en cas de piratage du compte et de changement d'email frauduleux

        console.log("Changer d'email");
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={handleClose}
            presentationStyle="pageSheet"
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: 20 }}>
                    <Pressable
                        onPress={handleClose}
                        style={{ alignSelf: 'flex-end', padding: 10, marginBottom: 10 }}
                    >
                        <MaterialIcons name="close" size={24} color={theme.colors.text} />
                    </Pressable>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                    >
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                            <AppText style={{ fontSize: 28, fontWeight: "bold", marginBottom: 25 }}>
                                Modification du profil
                            </AppText>

                            <View style={{ width: "100%" }}>
                                <TextInputGlobal text={username} setText={setUsername} label="Pseudo" />
                            </View>

                            <View
                                style={{
                                    width: "100%",
                                    height: 150,
                                    marginTop: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    paddingLeft: 20,
                                    justifyContent: "space-around",
                                }}
                            >
                                <ProfilImagePickerModal imagePdp={imagePdp} setImagePdp={setImagePdp} height={150} width={150} />
                            </View>

                            <View style={{ width: "100%", marginTop: 20 }} >
                                <BtnConnexion title="Apliquer les modifications" onClick={() => { handleSubmit() }} />
                            </View>

                            <View style={{ width: "100%", marginTop: 20 }} >
                                <BtnConnexion title="Changer de mot de passe" onClick={() => { handleChangeMdp() }} />
                            </View>
                            <View style={{ width: "100%", marginTop: 20 }} >
                                <BtnConnexion title="Changer d'E-mail" onClick={() => { handleChangeEmail() }} />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        </Modal>
    );
}
