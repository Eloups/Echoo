import { useLocalSearchParams, router } from 'expo-router';
import PlaylistDetailPage from '@/lib/components/playlistDetailPage';
import ArtistDetailPage from '@/lib/components/artistDetailPage';
import { Playlist } from '@/lib/types/types';
import { useEffect } from 'react';

export default function Detail() {
    const params = useLocalSearchParams();
    const data: Playlist = params.data ? JSON.parse(params.data as string) : null;
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

    return (
        <PlaylistDetailPage 
            data={data} 
            onBack={handleBack} 
        />
    );
}
