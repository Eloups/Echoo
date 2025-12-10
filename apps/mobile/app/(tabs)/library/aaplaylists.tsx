import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { BaseInfos } from "@/lib/types/types";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { PlaylistService, apiClient } from "@/lib/api";
import AppText from "@/lib/components/global/appText";

const coverSpongebob = require("../../../assets/tempImg/Covers_Playlists/Spongebob.jpg");
const coverMonkey = require("../../../assets/tempImg/Covers_Playlists/monkey.gif");
const cover = require("../../../assets/tempImg/Covers_Albums/HMHAS.jpg");
const cover2 = require("../../../assets/tempImg/Covers_Albums/RichMan.webp");

const musicTemp: BaseInfos = {
    cover: cover,
    title: "CHIHIRO",
    artist: "Billie Eilish",
    color1: "#04131D",
    color2: "#082840",
    nbStreams: 46,
    type: "music"
}

const musicTemp2: BaseInfos = {
    cover: cover2,
    title: "Rich Man",
    artist: "aespa",
    color1: "#000000",
    color2: "#0E0E0E",
    nbStreams: 24,
    type: "music"

}

const musicTemp3: BaseInfos = {
    cover: coverSpongebob,
    title: "Super Playlist",
    artist: "Jann",
    color1: "#965F4C",
    color2: "#291A15",
    nbStreams: 11,
    type: "playlist",
    nbMusics: 15,
    musicList: [musicTemp, musicTemp2, musicTemp, musicTemp2, musicTemp, musicTemp2, musicTemp, musicTemp2],
}

const playlistMonke: BaseInfos = {
    cover: coverMonkey,
    title: "Monke",
    artist: "Jann",
    color1: "#965F4C",
    color2: "#291A15",
    nbStreams: 11,
    type: "playlist",
    nbMusics: 15,
    musicList: [musicTemp, musicTemp2, musicTemp, musicTemp2, musicTemp, musicTemp2, musicTemp, musicTemp2],
}


export default function Playlists() {
    const { theme } = useTheme();
    const [playlists, setPlaylists] = useState<BaseInfos[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                setLoading(true);
                const userId = 3; // ID utilisateur
                const response: any = await PlaylistService.getAllPlaylistsByUserID(userId);
                
                console.log('Playlists récupérées:', response);
                
                // La réponse contient un objet avec une clé "playlist" qui est un tableau
                const playlistsArray = response.playlist || [];
                
                // Convertir les données de l'API au format BaseInfos
                const formattedPlaylists: BaseInfos[] = playlistsArray.map((playlist: any) => ({
                    id: playlist.id,
                    cover: playlist.coverPath 
                        ? { uri: apiClient.getImageUrl(playlist.coverPath) }
                        : coverSpongebob,
                    title: playlist.title || "Playlist",
                    artist: `${playlist.musics?.length || 0} morceaux`,
                    color1: "#965F4C",
                    color2: "#291A15",
                    nbStreams: 0,
                    type: "playlist" as const,
                    description: playlist.description || "",
                    nbMusics: playlist.musics?.length || 0,
                    musicList: playlist.musics?.map((music: any) => ({
                        cover: music.coverPath 
                            ? { uri: apiClient.getImageUrl(music.coverPath) }
                            : coverSpongebob,
                        title: music.titre || music.title,
                        artist: music.artisteNom || music.artist || "Artiste inconnu",
                        color1: "#04131D",
                        color2: "#082840",
                        nbStreams: music.nbEcoutes || 0,
                        type: "music" as const
                    })) || []
                }));
                
                setPlaylists(formattedPlaylists);
            } catch (err) {
                console.error('Erreur lors du chargement des playlists:', err);
                setError('Impossible de charger les playlists');
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

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
                    <MusicCard key={key} infos={playlist} isSearch={false}></MusicCard>
                )}
            </ScrollView>
        </View>
    )
}