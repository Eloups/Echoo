import React from "react";
import { View, Pressable, Text, Image, RootTagContext } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useSegments } from "expo-router";
import { useTheme } from "@/lib/theme/provider";
import AppText from "./global/appText";
import useGlobalHook from "@/hook/globalHook";

const pp = require("../../assets/img/pp.jpg");

type Props = {
    title?: string;
    subtitle?: string;
};

export default function AppHeader({ title, subtitle }: Props) {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const { user } = useGlobalHook();
    const segments = useSegments();

    const handlePress = () => {
        // Construire le chemin actuel
        const currentPath = '/' + segments.join('/');

        router.push({
            pathname: "/(tabs)/user/compte",
            params: {
                title: user?.username || "Compte",
                data: JSON.stringify(user),
                from: currentPath
            }
        });
    };

    return (
        <View
            style={{
                paddingTop: insets.top + 6,
                paddingHorizontal: 14,
                paddingBottom: 10,
                backgroundColor: theme.colors.background,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
            }}
        >
            <Pressable
                onPress={handlePress}
                style={{ width: 34, height: 34, borderRadius: 17, overflow: "hidden" }}
            >
                <Image
                    source={user?.image ? { uri: user.image } : pp}
                    style={{ width: "100%", height: "100%" }}
                />
            </Pressable>

            <View style={{ flex: 1, flexDirection: "row" }}>
                {
                    <AppText size="2xl" color={theme.colors.text}>{title}</AppText>
                }
                {subtitle && (
                    <View style={{ width: 6, height: 6, borderRadius: 100, backgroundColor: theme.colors.text, alignSelf: "center", marginHorizontal: 7 }}></View>
                )}
                {subtitle && (
                    <AppText size="2xl" color={theme.colors.text}>{subtitle}</AppText>
                )}
            </View>
        </View>
    );
}
