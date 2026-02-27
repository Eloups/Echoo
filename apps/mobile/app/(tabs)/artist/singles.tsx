import { View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import ProjectCard from '@/lib/components/projectCard';
import { ArtistService, apiClient } from '@/lib/api';
import { Project } from '@/lib/types/types';
import { useArtistPage } from './artistPageContext';

type ArtistSingleCard = Project & {
    id?: number;
    year?: string;
};


export default function SinglesPage() {
    const { theme } = useTheme();
    const { artist } = useArtistPage();
    const [singles, setSingles] = useState<ArtistSingleCard[]>([]);
    const [loadingSingles, setLoadingSingles] = useState<boolean>(true);

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
                        : require('../../../assets/images/react-logo.png'),
                    type: (single.projectType || 'single').toLowerCase(),
                    title: single.title || 'Single',
                    description: '',
                    artist: single.artistName || artist.title || 'Artiste inconnu',
                    musics: Array.isArray(single.musics) ? single.musics : [],
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
