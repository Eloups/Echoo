import { useLocalSearchParams, router } from 'expo-router';
import PlaylistDetailPage from '@/lib/components/playlistDetailPage';
import ProjectDetailsPage from '@/lib/components/projectDetailsPage';
import { Playlist } from '@/lib/types/types';

export default function Detail() {
    const params = useLocalSearchParams();
    const parsedData = params.data ? JSON.parse(params.data as string) : null;
    const from = params.from as string;
    const detailType = params.detailType as string | undefined;

    if (!parsedData) {
        return null;
    }

    const handleBack = () => {
        if (from) {
            router.push(from as any);
        } else {
            router.push('/(tabs)/home');
        }
    };

    const parsedType = typeof parsedData === 'object' && parsedData !== null && 'type' in parsedData
        ? (parsedData as any).type
        : undefined;

    const isProjectPayload = detailType === 'project' || (detailType !== 'playlist' && parsedType && parsedType !== 'playlist');

    if (isProjectPayload) {
        return <ProjectDetailsPage />;
    }

    const data = parsedData as Playlist;

    return <PlaylistDetailPage data={data} onBack={handleBack} />;
}
