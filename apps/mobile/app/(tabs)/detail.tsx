import { useLocalSearchParams, router } from 'expo-router';
import PlaylistDetailPage from '@/lib/components/playlistDetailPage';
import AlbumDetailPage from '@/lib/components/albumDetailPage';
import { BaseInfos } from '@/lib/types/baseInfos';

export default function Detail() {
    const params = useLocalSearchParams();
    const data: BaseInfos = params.data ? JSON.parse(params.data as string) : null;
    const from = params.from as string;

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

    // Afficher la page appropriée selon le type
    if (data.type === "playlist") {
        return (
            <PlaylistDetailPage 
                data={data} 
                onBack={handleBack} 
            />
        );
    } else if (data.type === "album" || data.type === "ep" || data.type === "single") {
        return (
            <AlbumDetailPage 
                data={data} 
                onBack={handleBack} 
            />
        );
    }

    return null;
}
