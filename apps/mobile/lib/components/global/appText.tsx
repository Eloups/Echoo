import React from "react";
import { Text, TextProps, StyleSheet, TextStyle } from "react-native";
import { useTheme } from "@/lib/theme/provider";

type Variant = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

type AppTextProps = TextProps & {
    /** Taille du texte (px ou variante prédéfinie) */
    size?: number | Variant;
    /** Couleur du texte (clé du thème ou valeur hex) */
    color?: keyof ReturnType<typeof useTheme>["theme"]["colors"] | string;
    /** Poids du texte ("regular" | "bold") */
    weight?: "regular" | "bold";
    /** Alignement du texte */
    align?: TextStyle["textAlign"];
    /** Fonction OnPress */
    onPress?: () => void;
};

const VARIANT_SIZES: Record<Variant, number> = {
    xs: 11,
    sm: 12,
    md: 13,
    lg: 15,
    xl: 16,
    "2xl": 20,
    "3xl": 32,
};

const FONT_FAMILIES: Record<NonNullable<AppTextProps["weight"]>, string> = {
    regular: "Kanit-Regular",
    bold: "Kanit-Bold",
};

export default function AppText({
    size = "md",
    color,
    weight = "regular",
    align,
    style,
    children,
    onPress,
    ...rest
}: AppTextProps) {
    const { theme } = useTheme();

    const resolvedSize =
        typeof size === "number" ? size : VARIANT_SIZES[size] ?? VARIANT_SIZES.md;

    const resolvedColor =
        typeof color === "string"
            ? (theme.colors as any)[color] ?? color
            : theme.colors[color ?? "text"];

    const baseStyle: TextStyle = {
        fontFamily: FONT_FAMILIES[weight],
        fontSize: resolvedSize,
        color: resolvedColor,
        textAlign: align,
    };

    return (
        <Text {...rest} style={[baseStyle, style]} onPress={() => { onPress ? onPress() : undefined}}>
            {children}
        </Text>
    );
}