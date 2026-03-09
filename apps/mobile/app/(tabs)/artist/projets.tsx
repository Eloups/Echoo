import { View, ScrollView } from 'react-native';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import ProjectCardArtistPage from '@/lib/components/projectCardArtistPage';
import { useArtistPage } from './artistPageContext';
import { useLocalSearchParams } from 'expo-router';


export default function ProjetsPage() {
    const { theme } = useTheme();
    const { artist, projects, loading } = useArtistPage();
    const params = useLocalSearchParams();

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

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 130, paddingTop: 65 }}>
                <View style={{ paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', columnGap: 9, rowGap: 9 }}>
                    {loading && projects.length === 0 && (
                        <AppText size="lg">Chargement des projets...</AppText>
                    )}

                    {projects.map((project, index) => (
                        <View key={`${project.id ?? 'project'}-${index}`} style={{ width: '48.7%' }}>
                            <ProjectCardArtistPage
                                infos={project}
                                fromPath='/(tabs)/artist/projets'
                                fromParams={JSON.stringify(artistReturnParams)}
                            />
                        </View>
                    ))}

                    {!loading && projects.length === 0 && (
                        <AppText size="lg">Aucun projet pour le moment.</AppText>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
