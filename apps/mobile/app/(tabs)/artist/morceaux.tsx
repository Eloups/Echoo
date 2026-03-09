import { View, ScrollView } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import { ArtistService, MusicService, apiClient } from '@/lib/api';
import { Music } from '@/lib/types/types';
import DetailMusicCard from '@/lib/components/detailMusicCard';
import { useArtistPage } from './artistPageContext';
import { PlaylistCoverDefault } from '@/lib/constants/images';


export default function MorceauxPage() {
    const { theme } = useTheme();
    const { artist } = useArtistPage();
    const [musics, setMusics] = useState<Music[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const placeholderCover = PlaylistCoverDefault;

    const mapMusicWithCover = useCallback(async (music: any): Promise<Music> => {
        let cover: any = placeholderCover;

        try {
            const coverData = await MusicService.getMusicCoverPath(Number(music.id));
            if (coverData?.cover_path) {
                cover = { uri: apiClient.getImageUrl(coverData.cover_path) };
            }
        } catch {
        }

        return {
            id: Number(music.id),
            cover,
            title: music.title,
            artist: music.nameArtist || artist.title || 'Artiste inconnu',
            color1: '#04131D',
            color2: '#082840',
            nbStreams: music.nbStreams,
            audioFile: music.filePath,
            duration: music.duration,
        };
    }, [artist.title, placeholderCover]);

    useEffect(() => {
        let isMounted = true;

        const fetchArtistMusics = async () => {
            if (!artist?.id) {
                if (isMounted) {
                    setMusics([]);
                    setLoading(false);
                }
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await ArtistService.getArtistMusics(Number(artist.id));
                const apiMusics = response?.musics || [];
                const mappedMusics = await Promise.all(apiMusics.map(mapMusicWithCover));

                if (isMounted) {
                    setMusics(mappedMusics);
                }
            } catch {
                if (isMounted) {
                    setError('Impossible de charger les morceaux de cet artiste.');
                    setMusics([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchArtistMusics();

        return () => {
            isMounted = false;
        };
    }, [artist?.id, mapMusicWithCover]);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 120, paddingTop: 65 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    {loading && (
                        <AppText size="lg">Chargement des morceaux...</AppText>
                    )}

                    {!loading && error && (
                        <AppText size="md" color="text2">{error}</AppText>
                    )}

                    {!loading && !error && musics.length === 0 && (
                        <AppText size="md" color="text2">Aucun morceau disponible pour cet artiste.</AppText>
                    )}

                    {!loading && !error && musics.map((music, index) => (
                        <DetailMusicCard
                            key={music.id}
                            infos={music}
                            isAlbum={true}
                            queue={musics}
                            index={index}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
