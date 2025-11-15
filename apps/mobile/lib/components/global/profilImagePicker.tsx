import React from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Alert, Image, TouchableOpacity, Modal, Pressable, Dimensions } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type ProfilImagePickerProps = {
    imagePdp: string | null;
    setImagePdp: (uri: string | null) => void;
    height?: number;
    width?: number;
};

export function ProfilImagePicker(props: ProfilImagePickerProps) {
    const { theme } = useTheme();

    const [modalVisible, setModalVisible] = React.useState(false);

    const pickFromGallery = async () => {
        setModalVisible(false);
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!granted) {
            Alert.alert("Permission refusée");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            props.setImagePdp(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        setModalVisible(false);
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();

        if (!granted) {
            Alert.alert("Permission refusée");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            props.setImagePdp(result.assets[0].uri);
        }
    };

    return (
        <View style={{
            height: props.height ? props.height : 74,
            width: props.width ? props.width : 74,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1000,
            backgroundColor: theme.colors.primary,
        }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                {props.imagePdp ? (
                    <Image
                        source={{ uri: props.imagePdp }}
                        style={{
                            height: props.height ? props.height : 74,
                            width: props.width ? props.width : 74,
                            borderRadius: 1000,
                        }}
                    />
                ) : (
                    <MaterialCommunityIcons
                        name="image-plus"
                        size={38}
                        color="#ffffff46"
                    />
                )}
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.4)",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                    onPress={() => setModalVisible(false)}
                >
                    <Pressable
                        style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            backgroundColor: theme.colors.background,
                            borderWidth: 2,
                            borderBottomWidth: 0,
                            borderColor: theme.colors.primary,
                            borderStyle: "solid",
                            width: "100%",
                            flexDirection: "row",
                            gap: 5,
                            justifyContent: "space-around",
                            padding: 20,
                        }}
                        onPress={(e) => e.stopPropagation()}>

                        <TouchableOpacity
                            style={{
                                height: props.imagePdp ? 85 : 100,
                                width: props.imagePdp ? 85 : 100,
                                borderRadius: 12,
                                backgroundColor: theme.colors.primary,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={takePhoto}
                        >
                            <FontAwesome name="camera" size={50} color={theme.colors.background} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: props.imagePdp ? 85 : 100,
                                width: props.imagePdp ? 85 : 100,
                                // borderWidth: 3,
                                // borderStyle: "solid",
                                borderRadius: 12,
                                backgroundColor: theme.colors.primary,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={pickFromGallery}
                        >
                            <FontAwesome6 name="image" size={50} color={theme.colors.background} />
                        </TouchableOpacity>

                        {props.imagePdp ?
                            <TouchableOpacity
                                style={{
                                    height: 85,
                                    width: 85,
                                    borderRadius: 12,
                                    backgroundColor: theme.colors.primary,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onPress={() => props.setImagePdp(null)}
                            >
                                <MaterialIcons name="delete" size={50} color={theme.colors.background} />
                            </TouchableOpacity>
                            : undefined
                        }
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    )
}