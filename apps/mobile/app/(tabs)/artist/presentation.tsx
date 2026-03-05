import { View, ScrollView, Image, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MusicCard from '@/lib/components/musicCard';
import SectionTitle from '@/lib/components/sectionTitle';
import { useArtistPage } from './artistPageContext';
import { LoadingSpinner } from '@/lib/components/global/BtnConnexion';
import { UserService } from '@/lib/api/user.service';
import { ArtistService } from '@/lib/api';
import { useAuthHook } from '@/hook/authHook';

export default function PresentationPage() {
    const { theme } = useTheme();
    const { artist, popularTracks, recentReleases, loading } = useArtistPage();
    const { userId } = useAuthHook();

    const [isArtistLike, setIsArtistLike] = useState<boolean>(false);

    //Vérifie si l'artiste est déjà liké par un utilisateur
    useEffect(() => {
    const artistId = artist.id;
    if (typeof artistId === "number" && userId) {
        const fetchIsArtistLike = async () => {
            try {
                const result = await ArtistService.getIsArtistIsLike(userId, artistId);
                setIsArtistLike(result.isLike);
            } catch (error) {
                console.error("Erreur lors de la récupération:", error);
            }
        };

            fetchIsArtistLike();
        }
    }, [artist.id, userId]);

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
                <LoadingSpinner size={26} color={theme.colors.primary} />
                <AppText style={{ marginTop: 10 }}>Chargement des informations de l&apos;artiste...</AppText>
            </View>
        );
    }

    const handleArtistLike = () => {
        const artistId = artist.id;
        if (typeof artistId === "number" && userId) {
            setIsArtistLike(!isArtistLike);
            UserService.postLikeArtist(userId, artistId);
        }
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
                                    onPress={() => handleArtistLike()}
                                >
                                    <MaterialIcons name={isArtistLike ? "favorite" : "favorite-border"} size={32} color={isArtistLike ? '#DB1151' : "white"} />
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
                    <View style={{ marginBottom: 30 }}>
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
