import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInputGlobal } from "./TextInput";
import AppText from "./appText";


type BtnConnexionProps = {
    title: string;
    color?: string;
    onClick?: () => void;
};

export function BtnConnexion(props: BtnConnexionProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity style={{
            width: "100%",
            // height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            paddingVertical: 12,
            backgroundColor: theme.colors.primary
        }}
            onPress={props.onClick}>
            <AppText color="#ffffff" size="lg">
                {props.title}
            </AppText>
        </TouchableOpacity>
    );
}
