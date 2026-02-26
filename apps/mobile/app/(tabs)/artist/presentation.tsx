import { View, ScrollView, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import { Artist, Music } from '@/lib/types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MusicCard from '@/lib/components/musicCard';
import SectionTitle from '@/lib/components/sectionTitle';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { apiClient, ArtistService, ImageService, MusicService } from '@/lib/api';

const placeholderImage = require('../../../assets/images/react-logo.png');

export default function PresentationPage() {
    const { theme } = useTheme();
    const router = useRouter();
    const params = useLocalSearchParams();
    const [menuVisible, setMenuVisible] = useState(false);
    const [artistDataState, setArtistDataState] = useState<Artist | null>(null);



    // Récupérer les données de l'artiste depuis les params
    const parseJsonSafely = (value: unknown) => {
        if (typeof value !== 'string') return value;
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    };

    const resolveCover = (coverValue: unknown) => {
        if (!coverValue) return placeholderImage;
        if (typeof coverValue === 'string') {
            return { uri: apiClient.getImageUrl(coverValue) };
        }
        return coverValue;
    };

    const normalizeMusicList = (value: unknown): any[] => {
        const parsedValue = parseJsonSafely(value);

        if (!Array.isArray(parsedValue)) {
            return [];
        }

        return parsedValue.flatMap((item) => {
            if (Array.isArray(item)) return item;
            return item ? [item] : [];
        });
    };

    const buildMusicListWithCover = async (musics: any[], fallbackArtistName: string): Promise<Music[]> => {
        return await Promise.all(
            musics.map(async (music) => {
                let musicCover: any = placeholderImage;

                try {
                    if (music?.id) {
                        const coverData = await MusicService.getMusicCoverPath(Number(music.id));
                        const coverPath = coverData?.cover_path;

                        if (coverPath) {
                            try {
                                await ImageService.GetImage(coverPath);
                            } catch {
                            }
                            musicCover = { uri: apiClient.getImageUrl(coverPath) };
                        }
                    }
                } catch (error) {
                    console.error(`Erreur lors de la récupération de la cover pour la musique ${music?.id}:`, error);
                }

                return {
                    id: Number(music?.id ?? 0),
                    title: String(music?.title ?? 'Titre inconnu'),
                    artist: music?.nameArtist || fallbackArtistName || 'Artiste inconnu',
                    cover: musicCover,
                    color1: '#04131D',
                    color2: '#082840',
                    duration: typeof music?.duration === 'number' ? music.duration : undefined,
                    nbStreams: typeof music?.nbStreams === 'number' ? music.nbStreams : undefined,
                    audioFile: music?.filePath || music?.fichierAudio || music?.audioFile || undefined,
                } as Music;
            })
        );
    };

    const rawData = parseJsonSafely(params.data);
    const rawArtist = (rawData as any)?.artist ?? rawData ?? {};

    const artistName =
        (rawArtist as any)?.title ||
        (rawArtist as any)?.name ||
        (params.title as string) ||
        'Artiste';

    const artistCover = resolveCover(
        (rawArtist as any)?.cover ||
        (rawArtist as any)?.imagePath ||
        params.cover
    );

    const popularRaw =
        (rawArtist as any)?.popular_musics ??
        (rawArtist as any)?.popularMusics ??
        params.popular_musics ??
        params.popularMusics ??
        [];

    const releasesRaw =
        (rawArtist as any)?.last_releases ??
        (rawArtist as any)?.lastReleases ??
        params.last_releases ??
        params.lastReleases ??
        [];

    const artistData: Artist = {
        id: Number((rawArtist as any)?.id ?? 0) || undefined,
        title: artistName,
        cover: artistCover,
        popular_musics: normalizeMusicList(popularRaw),
        last_releases: normalizeMusicList(releasesRaw)
    };

    useEffect(() => {
        const fetchArtistPage = async () => {
            try {
                const fallbackPopular = normalizeMusicList(popularRaw);
                const fallbackReleases = normalizeMusicList(releasesRaw);
                const [fallbackPopularMapped, fallbackReleasesMapped] = await Promise.all([
                    buildMusicListWithCover(fallbackPopular, artistData.title),
                    buildMusicListWithCover(fallbackReleases, artistData.title),
                ]);

                const fallbackArtistData: Artist = {
                    ...artistData,
                    popular_musics: fallbackPopularMapped,
                    last_releases: fallbackReleasesMapped,
                };

                const paramArtistId = Number((params.artistId as string) || (params.id as string) || 0);
                const dataArtistId = Number((rawArtist as any)?.id || 0);
                const artistId = paramArtistId || dataArtistId;

                if (!artistId) {
                    setArtistDataState(fallbackArtistData);
                    return;
                }

                const pageResponse: any = await ArtistService.getArtistPage(artistId);
                const apiArtist = pageResponse?.artist;

                if (!apiArtist) {
                    setArtistDataState(fallbackArtistData);
                    return;
                }

                const apiPopularRaw = normalizeMusicList(apiArtist.popularMusics);
                const apiReleasesRaw = normalizeMusicList(apiArtist.lastReleases);
                const [popularMapped, releasesMapped] = await Promise.all([
                    buildMusicListWithCover(apiPopularRaw, apiArtist.name || fallbackArtistData.title),
                    buildMusicListWithCover(apiReleasesRaw, apiArtist.name || fallbackArtistData.title),
                ]);

                const normalizedArtist: Artist = {
                    id: apiArtist.id,
                    title: apiArtist.name || fallbackArtistData.title,
                    cover: resolveCover(apiArtist.imagePath || fallbackArtistData.cover),
                    isVerified: apiArtist.isVerified,
                    description: apiArtist.description,
                    popular_musics: popularMapped,
                    last_releases: releasesMapped,
                };

                setArtistDataState(normalizedArtist);
            } catch (error) {
                console.error('Erreur lors de la récupération de la page artiste:', error);
                setArtistDataState({
                    ...artistData,
                    popular_musics: [],
                    last_releases: [],
                });
            }
        };

        fetchArtistPage();
    }, [params.artistId, params.id, params.data]);

    const data: Artist = artistDataState || artistData;
    console.log('data : ', data);
    const from = params.from as string;

    const handleBack = () => {
        if (from) {
            router.push(from as any);
        } else {
            router.push('/(tabs)/home');
        }
    };

    const popularTracks: Music[] = (data.popular_musics || []).slice(0, 5);
    const recentReleases: Music[] = (data.last_releases || []).slice(0, 4);
    

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
                    <View style={{ paddingHorizontal: 20 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }}>
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
                    <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }}>
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
