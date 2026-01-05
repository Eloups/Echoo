import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { BaseInfos } from "@/lib/types/types";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import AppText from "@/lib/components/global/appText";

export default function Albums() {
    const { theme } = useTheme();
    const [albums, setAlbums] = useState<BaseInfos[]>([]);
    const [loading, setLoading] = useState(false);

    // Note: Remplacer par l'appel API approprié quand disponible
    // useEffect(() => {
    //     const fetchAlbums = async () => {
    //         try {
    //             setLoading(true);
    //             const response: any = await AlbumService.getAllAlbumsByUserID(3);
    //             const albumsArray = response.albums || [];
    //             const formattedAlbums: BaseInfos[] = albumsArray.map((album: any) => ({
    //                 id: album.id,
    //                 cover: album.coverPath 
    //                     ? { uri: apiClient.getImageUrl(album.coverPath) }
    //                     : cover,
    //                 title: album.title,
    //                 artist: album.artist,
    //                 color1: "#04131D",
    //                 color2: "#082840",
    //                 nbStreams: album.nbStreams || 0,
    //                 type: "album" as const
    //             }));
    //             setAlbums(formattedAlbums);
    //         } catch (err) {
    //             console.error('Erreur:', err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchAlbums();
    // }, []);

    if (loading) {
        return (
            <View style={{ backgroundColor: theme.colors.background, height: "100%", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <AppText style={{ marginTop: 10 }}>Chargement des albums...</AppText>
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                {albums.map((album, key) =>
                    <MusicCard key={key} infos={album} isSearch={false}></MusicCard>
                )}
            </ScrollView>
        </View>
    )
}
