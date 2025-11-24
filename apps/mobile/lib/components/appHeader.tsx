import React from "react";
import { View, Pressable, Text, Image, RootTagContext } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTheme } from "@/lib/theme/provider";
import AppText from "./appText";

const pp = require("../../assets/tempImg/pp/madmadeline.jpg");

type Props = {
    title?: string;
    subtitle?: string;
};

export default function AppHeader({ title, subtitle }: Props) {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

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
                onPress={() => router.push("/bases/connexion")}
                style={{ width: 34, height: 34, borderRadius: 17, overflow: "hidden" }}
            >
                <Image
                    source={pp}
                    style={{ width: "100%", height: "100%" }}
                />
            </Pressable>

            <View style={{ flex: 1, flexDirection: "row"}}>
                {
                    <AppText size="2xl" color={theme.colors.text}>{title}</AppText>
                }
                {subtitle && (
                    <View style={{width: 6, height: 6, borderRadius: 100, backgroundColor: theme.colors.text, alignSelf: "center", marginHorizontal: 7}}></View>
                )}
                {subtitle && (
                    <AppText size="2xl" color={theme.colors.text}>{subtitle}</AppText>
                )}
            </View>
        </View>
    );
}
