import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import Ionicons from '@expo/vector-icons/Ionicons';


type BtnConnexionProps = {
    title: string;
    color?: string;
    onClick?: () => void;
};

export function BtnConnexion(props: BtnConnexionProps) {
    const { theme } = useTheme();

    return (
        <View style={{ width: "100%", height: "100%" }}>
            <Button
                onPress={() => { console.log("Se connecter click") }}
                title= {props.title}
                color={props.color == undefined ? theme.colors.primary : props.color}
                accessibilityLabel="Bouton de connexion"
            />
        </View>
    );





}
