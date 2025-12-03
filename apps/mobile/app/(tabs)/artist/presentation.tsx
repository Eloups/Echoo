import { View, ScrollView, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/appText';
import { BaseInfos } from '@/lib/types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MusicCard from '@/lib/components/musicCard';
import SectionTitle from '@/lib/components/sectionTitle';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function PresentationPage() {
    const { theme } = useTheme();
    const router = useRouter();
    const params = useLocalSearchParams();
    const [menuVisible, setMenuVisible] = useState(false);

    // Récupérer les données de l'artiste depuis les params
    const artistData = params.data ? JSON.parse(params.data as string) : {
        title: params.title as string || "Artiste",
        cover: params.cover,
        type: "artist",
        nbStreams: parseInt(params.nbStreams as string) || 1234567,
    };
    
    const data: BaseInfos = artistData;
    const from = params.from as string;

    const handleBack = () => {
        if (from) {
            router.push(from as any);
        } else {
            router.push('/(tabs)/home');
        }
    };

    // Données temporaires
    const popularTracks: BaseInfos[] = Array(5).fill({
        title: "Track populaire",
        artist: data.title,
        cover: data.cover,
        type: "music"
    });

    const recentReleases: BaseInfos[] = Array(4).fill({
        title: "Single récent",
        artist: data.title,
        cover: data.cover,
        type: "music"
    });

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {/* Header avec image de fond */}
                <View style={{ position: 'relative', height: 220 }}>
                    {/* Image de fond avec overlay */}
                    <Image 
                        source={data.cover} 
                        style={{ 
                            width: '100%', 
                            height: '100%',
                            position: 'absolute'
                        }}
                    />

                    {/* Nom et stats en bas */}
                    <View style={{ 
                        position: 'absolute', 
                        bottom: 10, 
                        left: 20, 
                        right: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <AppText size="3xl" weight='bold' style={{ fontWeight: 'bold', color: 'white' }}>
                                {data.title}
                            </AppText>
                            {data.nbStreams && (
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <AppText size="lg" style={{ color: 'white' }}>
                                        {(data.nbStreams / 1000000).toFixed(1)}M
                                    </AppText>
                                    <Pressable
                                        onPress={() => {
                                            console.log('Suivre l\'artiste');
                                        }}
                                    >
                                        <MaterialIcons name="favorite-border" size={32} color="white" />
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Morceaux populaires */}
                <View>
                    <SectionTitle text="Morceaux populaires" />
                    <View style={{ paddingHorizontal: 20 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }}>
                            {popularTracks.map((track, index) => (
                                <View key={index}>
                                    <MusicCard 
                                        infos={track}
                                        type="music"
                                        isHome={true}
                                        isSearch={false}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Dernières sorties */}
                <View style={{ marginTop: 20 }}>
                    <SectionTitle text="Dernières sorties" />
                    <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }}>
                            {recentReleases.map((release, index) => (
                                <View key={index}>
                                    <MusicCard 
                                        infos={release}
                                        type="music"
                                        isHome={true}
                                        isSearch={false}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    dropdownMenu: {
        position: 'absolute',
        top: 45,
        right: 0,
        width: 180,
        borderRadius: 8,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1000,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
});
