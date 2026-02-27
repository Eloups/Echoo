import { View, ScrollView, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MusicCard from '@/lib/components/musicCard';
import SectionTitle from '@/lib/components/sectionTitle';
import { useArtistPage } from './artistPageContext';
import { LoadingSpinner } from '@/lib/components/global/BtnConnexion';

export default function PresentationPage() {
    const { theme } = useTheme();
    const { artist, popularTracks, recentReleases, loading } = useArtistPage();

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
                <LoadingSpinner size={26} color={theme.colors.primary} />
                <AppText style={{ marginTop: 10 }}>Chargement des informations de l'artiste...</AppText>
            </View>
        );
    }
    

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header avec image de fond */}
                <View style={{ position: 'relative', height: 220 }}>
                    {/* Image de fond avec overlay */}
                    <Image
                        source={artist.cover}
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
                                {artist.title}
                            </AppText>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>

                                <Pressable
                                    onPress={() => {
                                        console.log('Suivre l\'artiste');
                                    }}
                                >
                                    <MaterialIcons name="favorite-border" size={32} color="white" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Morceaux populaires */}
                <View>
                    <SectionTitle text="Morceaux populaires" />
                    <View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15, paddingHorizontal: 20 }}>
                            {popularTracks.map((track, index) => (
                                <View key={index}>
                                    <MusicCard
                                        infos={track}
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
                    <View style={{  marginBottom: 30 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15, paddingHorizontal: 20 }}>
                            {recentReleases.map((release, index) => (
                                <View key={index}>
                                    <MusicCard
                                        infos={release}
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
