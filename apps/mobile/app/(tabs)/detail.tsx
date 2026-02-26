import { useLocalSearchParams, router } from 'expo-router';
import PlaylistDetailPage from '@/lib/components/playlistDetailPage';
import ProjectDetailsPage from '@/lib/components/projectDetailsPage';
import { Playlist } from '@/lib/types/types';

export default function Detail() {
    const params = useLocalSearchParams();
    const data: Playlist = params.data ? JSON.parse(params.data as string) : null;
    const from = params.from as string;
    const detailType = params.detailType as string | undefined;

    if (!data) {
        return null;
    }

    const handleBack = () => {
        if (from) {
            router.push(from as any);
        } else {
            router.push('/(tabs)/home');
        }
    };

    if (detailType === 'project') {
        return <ProjectDetailsPage />;
    }

    return <PlaylistDetailPage data={data} onBack={handleBack} />;
}
