import { View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import ProjectCard from '@/lib/components/projectCard';
import { ArtistService, apiClient } from '@/lib/api';
import { Project } from '@/lib/types/types';
import { useArtistPage } from '@/lib/context/artistPageContext';
import { useLocalSearchParams } from 'expo-router';
import { PlaylistCoverDefault } from '@/lib/constants/images';

type ArtistSingleCard = Project & {
    id?: number;
    year?: string;
};


export default function SinglesPage() {
    const { theme } = useTheme();
    const { artist } = useArtistPage();
    const params = useLocalSearchParams();
    const [singles, setSingles] = useState<ArtistSingleCard[]>([]);
    const [loadingSingles, setLoadingSingles] = useState<boolean>(true);

    const artistReturnParams = {
        ...params,
        artistId: (params.artistId as string | undefined) ?? (artist.id ? String(artist.id) : undefined),
        title: (params.title as string | undefined) ?? artist.title,
        data: (params.data as string | undefined) ?? JSON.stringify({
            id: artist.id,
            title: artist.title,
            cover: artist.cover,
        }),
        from: (params.from as string | undefined) ?? '/(tabs)/home',
    };

    useEffect(() => {
        let isMounted = true;

        const fetchSingles = async () => {
            if (!artist.id) {
                if (isMounted) {
                    setSingles([]);
                    setLoadingSingles(false);
                }
                return;
            }

            try {
                setLoadingSingles(true);
                const response = await ArtistService.getArtistSingles(artist.id);

                const mappedSingles: ArtistSingleCard[] = (response?.singles || []).map((single) => ({
                    id: single.id,
                    cover: single.coverPath
                        ? { uri: apiClient.getImageUrl(single.coverPath) }
                        : PlaylistCoverDefault,
                    type: (single.projectType || 'single').toLowerCase(),
                    title: single.title || 'Single',
                    description: '',
                    artist: single.artistName || artist.title || 'Artiste inconnu',
                    musics: Array.isArray(single.musics) ? (single.musics as any[]) : [],
                    year: typeof single.release === 'string' ? single.release.slice(0, 4) : undefined,
                }));

                if (isMounted) {
                    setSingles(mappedSingles);
                }
            } catch {
                if (isMounted) {
                    setSingles([]);
                }
            } finally {
                if (isMounted) {
                    setLoadingSingles(false);
                }
            }
        };

        fetchSingles();

        return () => {
            isMounted = false;
        };
    }, [artist.id, artist.title]);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 130, paddingTop: 65 }}>
                <View style={{ paddingHorizontal: 20, rowGap: 10 }}>
                    {loadingSingles && (
                        <AppText size="lg">Chargement des singles...</AppText>
                    )}

                    {singles.map((single, index) => (
                        <ProjectCard
                            key={`${single.title}-${index}`}
                            infos={single}
                            isArtistPage
                            fromPath='/(tabs)/artist/singles'
                            fromParams={JSON.stringify(artistReturnParams)}
                        />
                    ))}

                    {!loadingSingles && singles.length === 0 && (
                        <AppText size="lg">Aucun single pour le moment.</AppText>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
