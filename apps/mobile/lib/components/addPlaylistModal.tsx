import React, { useState } from "react";
import {
    Modal,
    View,
    TextInput,
    Pressable,
    TouchableOpacity,
    Image,
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
import FontAwesome from "@expo/vector-icons/FontAwesome";

type AddPlaylistModalProps = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (title: string, description: string, coverBase64: string | null) => void;
};

export default function AddPlaylistModal({ visible, onClose, onSubmit }: AddPlaylistModalProps) {
    const { theme } = useTheme();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState<string | null>(null);

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

    const pickFromGallery = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!granted) {
            Alert.alert("Permission refusée", "Vous devez autoriser l'accès à la galerie");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            setCoverImage(result.assets[0].base64);
        }
    };

    const takePhoto = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();

        if (!granted) {
            Alert.alert("Permission refusée", "Vous devez autoriser l'accès à la caméra");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            setCoverImage(result.assets[0].base64);
        }
    };

    const showImagePickerOptions = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Annuler', 'Prendre une photo', 'Choisir dans la galerie'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        takePhoto();
                    } else if (buttonIndex === 2) {
                        pickFromGallery();
                    }
                }
            );
        } else {
            Alert.alert(
                'Ajouter une image',
                'Choisissez une option',
                [
                    { text: 'Annuler', style: 'cancel' },
                    { text: 'Prendre une photo', onPress: takePhoto },
                    { text: 'Choisir dans la galerie', onPress: pickFromGallery },
                ]
            );
        }
    };

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
                                Nouvelle playlist
                            </AppText>

                            <AppText style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
                                Nom de la playlist*
                            </AppText>
                            <TextInput
                                style={{
                                    backgroundColor: theme.colors.backgroundSecondary,
                                    borderRadius: 8,
                                    padding: 15,
                                    color: theme.colors.text,
                                    fontSize: 16,
                                    marginBottom: 25,
                                    borderWidth: 1,
                                    borderColor: theme.colors.primary,
                                }}
                                placeholder="Ma nouvelle playlist"
                                placeholderTextColor={theme.colors.text2}
                                value={title}
                                onChangeText={setTitle}
                                maxLength={100}
                            />

                            {/* Ajouter une cover */}
                            <AppText style={{ fontSize: 16, fontWeight: "600", marginBottom: 15 }}>
                                Ajouter une cover
                            </AppText>
                            <TouchableOpacity
                                onPress={showImagePickerOptions}
                                style={{
                                    width: 150,
                                    height: 150,
                                    backgroundColor: theme.colors.primary,
                                    borderRadius: 12,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignSelf: "center",
                                    marginBottom: 25,
                                }}
                            >
                                {coverImage ? (
                                    <Image
                                        source={{ uri: `data:image/jpeg;base64,${coverImage}` }}
                                        style={{
                                            width: 150,
                                            height: 150,
                                            borderRadius: 12,
                                        }}
                                    />
                                ) : (
                                    <MaterialIcons name="add-photo-alternate" size={60} color={theme.colors.background} opacity={0.7} />
                                )}
                            </TouchableOpacity>

                            <AppText style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>
                                Description
                            </AppText>
                            <TextInput
                                style={{
                                    backgroundColor: theme.colors.backgroundSecondary,
                                    borderRadius: 8,
                                    padding: 15,
                                    color: theme.colors.text,
                                    fontSize: 16,
                                    marginBottom: 25,
                                    borderWidth: 1,
                                    borderColor: theme.colors.primary,
                                    minHeight: 100,
                                    textAlignVertical: "top",
                                }}
                                placeholder="C'est une superbe nouvelle playlist !"
                                placeholderTextColor={theme.colors.text2}
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={4}
                                maxLength={500}
                            />

                            {/* Bouton Créer */}
                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={{
                                    backgroundColor: theme.colors.primary,
                                    borderRadius: 10,
                                    padding: 16,
                                    alignItems: "center",
                                    marginTop: 10,
                                }}
                            >
                                <AppText style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                                    Créer la playlist
                                </AppText>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        </Modal>
    );
}
