import PlaylistCard from "@/lib/components/playlistCard";
import { useTheme } from "@/lib/theme/provider";
import { Playlist } from "@/lib/types/types";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { PlaylistService, apiClient } from "@/lib/api";
import AppText from "@/lib/components/global/appText";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Playlists() {
    const { theme } = useTheme();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlaylists = useCallback(async () => {
        try {
            setLoading(true);
            const userId = 3; // ID utilisateur
            const response: any = await PlaylistService.getAllPlaylistsByUserID(userId);
            
            const playlistsArray = response.playlists || [];
            
            // Convertir les données de l'API au format Playlist du front
            const formattedPlaylists: Playlist[] = playlistsArray.map((playlist: any) => ({
                    id: playlist.id,
                    cover: playlist.coverPath 
                        ? { uri: apiClient.getImageUrl(playlist.coverPath) }
                        : require("../../../assets/images/react-logo.png"),
                    title: playlist.title || "Playlist",
                    artist: `${playlist.musics?.length || 0} morceaux`,
                    color1: "#965F4C",
                    color2: "#291A15",
                    nbStreams: 0,
                    type: "playlist" as const,
                    description: playlist.description || "",
                    nbMusics: playlist.musics?.length || 0,
                    musicList: playlist.musics?.map((music: any) => ({
                        id: music.id,
                        cover: music.coverPath 
                            ? { uri: apiClient.getImageUrl(music.coverPath) }
                            : require("../../../assets/images/react-logo.png"),
                        title: music.titre || music.title,
                        artist: music.artisteNom || music.nameArtist || music.artist || "Artiste inconnu",
                        color1: "#04131D",
                        color2: "#082840",
                        nbStreams: music.nbEcoutes || music.nbStreams || 0,
                        type: "music" as const,
                        audioFile: music.fichierAudio || music.audioFile || music.filePath || `music_${music.id}.mp3`,
                        duration: music.duree || music.duration || 300 // 300 secondes par défaut si pas de durée
                    })) || []
                }));
                
                setPlaylists(formattedPlaylists);
            } catch (err) {
                console.error('Erreur lors du chargement des playlists:', err);
                setError('Impossible de charger les playlists');
            } finally {
                setLoading(false);
            }
        }, []);

    useFocusEffect(
        useCallback(() => {
            fetchPlaylists();
        }, [fetchPlaylists])
    );

    if (loading) {
        return (
            <View style={{ backgroundColor: theme.colors.background, height: "100%", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <AppText style={{ marginTop: 10 }}>Chargement des playlists...</AppText>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ backgroundColor: theme.colors.background, height: "100%", justifyContent: "center", alignItems: "center", padding: 20 }}>
                <AppText color="text2" style={{ textAlign: "center" }}>{error}</AppText>
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                {playlists.map((playlist, key) =>
                    <PlaylistCard key={key} infos={playlist} isSearch={false}></PlaylistCard>
                )}
            </ScrollView>
        </View>
    )
}