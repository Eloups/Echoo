import { useTheme } from "@/lib/theme/provider";
import React from "react";
import { Modal, View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

type ErrorModalProps = {
    message: string;
    onClose: () => void;
};
export default function ErrorModal(props: ErrorModalProps) {
    const { theme } = useTheme();


    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.message !== "") {
            setOpen(true);
        }
    }, [props.message]);

    function handleClose() {
        setOpen(false);
        props.onClose();
    }

    return (
        <Modal
            visible={open}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                    <Text style={styles.title}>Erreur</Text>

                    <ScrollView style={styles.messageContainer}>
                        <Text style={[styles.message, { color: theme.colors.text }]}>{props.message}</Text>
                    </ScrollView>

                    <Pressable style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Fermer</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: "80%",
        maxHeight: "80%",
        padding: 20,
        borderRadius: 10,
        elevation: 10
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "red"
    },
    messageContainer: {
        maxHeight: "80%",
        marginBottom: 20
    },
    message: {
        fontSize: 16
    },
    button: {
        backgroundColor: "red",
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
});
