import { apiClient, MusicService } from "@/lib/api";
import { UserService } from "@/lib/api/user.service";
import { authClient } from "@/lib/auth/auth-client";
import DetailMusicCard from "@/lib/components/detailMusicCard";
import AppText from "@/lib/components/global/appText";
import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { Music, Playlist } from "@/lib/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const placeholderImage = require("../../../assets/images/react-logo.png");

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

    const fetchPlaylist = async () => {
        try {
            const { data: session, error } = await authClient.getSession();

            if (error || !session) {
                return
            }

            const playlist = await UserService.getLikedPlaylist(session.user.id);

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
    }

    useEffect(() => {
        fetchPlaylist();
    }, []);

    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingHorizontal: 20, height: "100%", paddingTop: 20, marginBottom: 130 }}>
                <View style={{ alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 10, width: '100%', justifyContent: 'space-between' }}>
                        <AppText size="sm" color="text">
                            {musics.length !== 0 ? musics.length : 'Aucun'} Morceaux
                        </AppText>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <AppText size="sm" color="text">{formatDuration(totalDuration)}</AppText>
                            <Ionicons name="time-outline" size={14} color={theme.colors.text} />
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: theme.colors.text, marginTop: 5 }}></View>
                {musics.length > 0 && (
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
                )}
            </ScrollView >
        </View >
    )
}
