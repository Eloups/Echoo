import { useLocalSearchParams, router } from 'expo-router';
import PlaylistDetailPage from '@/lib/components/playlistDetailPage';
import ArtistDetailPage from '@/lib/components/artistDetailPage';
import { BaseInfos } from '@/lib/types/types';
import { useEffect } from 'react';

export default function Detail() {
    const params = useLocalSearchParams();
    const data: BaseInfos = params.data ? JSON.parse(params.data as string) : null;
    const from = params.from as string;

    useEffect(() => {
        if (data?.type === "album" || data?.type === "ep" || data?.type === "single") {
            router.replace({
                pathname: '/(tabs)/album/musiques',
                params: { data: JSON.stringify(data), from }
            });
        }
    }, [data]);

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
    } else if (data.type === "artist") {
        return (
            <ArtistDetailPage 
                data={data} 
                onBack={handleBack} 
            />
        );
    }

    return null;
}
