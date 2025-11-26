import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import Ionicons from '@expo/vector-icons/Ionicons';

type TextInputProps = {
    label: string;
    text: string;
    star?: boolean;
    setText?: (text: string) => void;
};

export function TextInputGlobal(props: TextInputProps) {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(!props.star); // Par défaut, affiche le texte si `star` est false

    return (
        <View style={{ width: "100%" }}>
            <Text style={{ color: theme.colors.text2, paddingLeft: 5 }}>
                {props.label}
            </Text>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                borderColor: theme.colors.primary,
                borderWidth: 3,
                borderRadius: 5,
                paddingHorizontal: 5,
            }}>
                <TextInput
                    style={{
                        flex: 1,
                        color: theme.colors.text,
                        height: 47
                    }}
                    value={props.text}
                    onChangeText={props.setText}
                    secureTextEntry={props.star && !showPassword}
                />
                {props.star && 
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? "eye" : "eye-off"}
                            size={20}
                            color={theme.colors.text}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}
