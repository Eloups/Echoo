import { View, ScrollView } from 'react-native';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import ProjectCardArtistPage from '@/lib/components/projectCardArtistPage';
import { useArtistPage } from './artistPageContext';


export default function ProjetsPage() {
    const { theme } = useTheme();
    const { projects, loading } = useArtistPage();

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
