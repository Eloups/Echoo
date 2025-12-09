import { View, ScrollView, Image, Pressable } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const cover = require("../../../assets/tempImg/Covers_Albums/HMHAS.jpg");


export default function MorceauxPage() {
    const { theme } = useTheme();
    const router = useRouter();
    const params = useLocalSearchParams();
    const from = params.from as string;

    const handleBack = () => {
        if (from) {
            router.push(from as any);
        } else {
            router.push('/(tabs)/home');
        }
    };

    const data = {
        title: params.title as string || "Artiste",
        cover: cover,
        nbStreams: 1234567,
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}>
                {/* Contenu Morceaux */}
                <View style={{ padding: 20 }}>
                    <AppText size="lg">Morceaux à venir...</AppText>
                </View>
            </ScrollView>
        </View>
    );
}
