import { apiClient, MusicService } from "@/lib/api";
import { UserService } from "@/lib/api/user.service";
import { authClient } from "@/lib/auth/auth-client";
import DetailMusicCard from "@/lib/components/detailMusicCard";
import AppText from "@/lib/components/global/appText";
import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { Music, Playlist } from "@/lib/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { PlaylistCoverDefault } from "@/lib/constants/images";
import { useFocusEffect } from "@react-navigation/native";

const placeholderImage = PlaylistCoverDefault;

export default function Liked() {
    const { theme } = useTheme();

    const [totalDuration, setTotalDuration] = useState(0); // TODO set après fetch
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [musics, setMusics] = useState<Music[]>([]);

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}min${secs.toString().padStart(2, '0')}`;
    };

    const fetchPlaylist = useCallback(async () => {
        try {
            const { data: session, error } = await authClient.getSession();

            if (error || !session) {
                return
            }

            const playlist = await UserService.getLikedPlaylist(session.user.id);
            console.log(session.user.id);
            if (!playlist.playlist) { // null si playlist vide
                return
            }

            if (!playlist.playlist.musics) {
                return
            }

            const formattedMusics: Music[] = await Promise.all(
                (playlist.playlist.musics || []).map(async (music: any) => {
                    let coverUri = playlist.playlist.cover;

                    try {
                        const coverData = await MusicService.getMusicCoverPath(music.id);
                        if (coverData.cover_path) {
                            coverUri = { uri: apiClient.getImageUrl(coverData.cover_path) };
                        }
                    } catch (error) {
                        console.error(`Erreur lors de la récupération de la cover pour la musique ${music.id}:`, error);
                    }

                    return {
                        id: music.id,
                        cover: coverUri,
                        title: music.title,
                        artist: music.nameArtist || music.artist || "Artiste inconnu",
                        color1: "#04131D",
                        color2: "#082840",
                        nbStreams: music.nbStreams || 0,
                        type: "music" as const,
                        audioFile: music.filePath || music.fichierAudio || music.audioFile || `music_${music.id}.mp3`,
                        duration: music.duration || 0
                    };
                })
            );

            setMusics(formattedMusics);

            // setMusics(playlist.playlist.musics)
            setPlaylist(playlist.playlist);

        } catch (err) {
            console.error('Erreur lors du chargement de la playlist:', err);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchPlaylist();
        }, [fetchPlaylist])
    );

    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{ height: "100%", paddingBottom: 130 }}>
                <View style={{ alignItems: 'center', paddingTop: 10, paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10, width: '100%', justifyContent: 'space-between' }}>
                        <AppText size="sm" color="text">
                            {musics.length !== 0 ? musics.length : 'Aucun'} Morceaux
                        </AppText>
                    </View>
                </View>
                <View style={{ height: 1, marginHorizontal: 20 }}>
                    <View style={{ width: '100%', backgroundColor: theme.colors.text, height: "100%" }}></View>
                </View>
                {musics.length > 0 ? (
                    <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
                        {musics.map((music, index) => (
                            <View key={music.id || index} style={{ marginBottom: 9 }}>
                                <DetailMusicCard
                                    infos={music}
                                    onRemove={() => fetchPlaylist()}
                                    queue={musics}
                                    index={index}
                                    fromPlaylistId={playlist ? playlist.id : undefined}
                                />
                            </View>
                        ))}
                    </View>
                ) : <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
                    <AppText style={{ textAlign: 'center' }}>Aucun titres likés</AppText>
                </View>}
            </ScrollView >
        </View >
    )
}
