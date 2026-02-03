import { Pressable, StyleSheet } from "react-native";
import { ReactNode } from "react";
import { router } from "expo-router";
import { useTheme } from "../theme/provider";

type Props = {
    href: `/` | `/home` | `/discover`,
    children: ReactNode,
    selected: boolean | undefined
}



export default function NavBarButton(props: Props) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        ButtonActivated: {
            backgroundColor: theme.colors.background2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 57,
            padding: 5,
            margin: 5,
            borderRadius: 1000,
            alignSelf: "center"
        },
        ButtonDeactivated: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 57,
            padding: 5,
            margin: 5,
            borderRadius: 6,
            alignSelf: "center"
        }
    });

    return (
        <Pressable
            onPress={() => props.href && router.push(props.href)}
            style={props.selected == true ? styles.ButtonActivated : styles.ButtonDeactivated}>
            {props.children}
        </Pressable>
    )
}

