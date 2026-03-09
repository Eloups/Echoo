import React, { useRef, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Button, Animated, Easing } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TextInputGlobal } from "./TextInput";
import AppText from "./appText";


type BtnConnexionProps = {
    title: string;
    color?: string;
    onClick?: () => void;
    isLoading?: boolean;
};

type LoadingSpinnerProps = {
    size?: number;
    color?: string;
};

export function LoadingSpinner({ size = 20, color = "#ffffff" }: LoadingSpinnerProps) {
    const spinValue = useRef(new Animated.Value(0)).current;
    const loopRef = React.useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        spinValue.setValue(0);
        loopRef.current = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 400,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        loopRef.current.start();

        return () => {
            if (loopRef.current) {
                loopRef.current.stop();
                loopRef.current = null;
            }
            spinValue.stopAnimation();
            spinValue.setValue(0);
        };
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <AntDesign name="loading" size={size} color={color} />
        </Animated.View>
    );
}

export function BtnConnexion(props: BtnConnexionProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={{
                width: "100%",
                // height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                paddingVertical: 12,
                backgroundColor: props.color ?? theme.colors.primary,
                opacity: props.isLoading ? 0.8 : 1,
            }}
            onPress={props.isLoading ? undefined : props.onClick}
            activeOpacity={props.isLoading ? 1 : 0.7}
            disabled={props.isLoading}
        >
            {props.isLoading ? (
                <LoadingSpinner size={20} color="#ffffff" />
            ) : (
                <AppText color="#ffffff" size="lg">
                    {props.title}
                </AppText>
            )}
        </TouchableOpacity>
    );
}
