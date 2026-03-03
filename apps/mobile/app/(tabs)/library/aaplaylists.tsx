import PlaylistCard from "@/lib/components/playlistCard";
import { useTheme } from "@/lib/theme/provider";
import { Playlist } from "@/lib/types/types";
import { ScrollView, View, Pressable, Alert } from "react-native";
import { useEffect, useState } from "react";
import { PlaylistService, apiClient, ImageService } from "@/lib/api";
import AppText from "@/lib/components/global/appText";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import AddPlaylistModal from "@/lib/components/addPlaylistModal";
import { LoadingSpinner } from "@/lib/components/global/BtnConnexion";
import { PlaylistCoverDefault } from "@/lib/constants/images";

export default function Playlists() {
    const { theme } = useTheme();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [addPlaylistVisible, setAddPlaylistVisible] = useState(false);

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
                        : PlaylistCoverDefault,
                    title: playlist.title || "Playlist",
                    artist: `${playlist.musics?.length || 0} morceaux`,
                    color1: "#965F4C",
                    color2: "#291A15",
                    type: "playlist" as const,
                    description: playlist.description || "",
                    nbMusics: playlist.nbMusics,
                    musicList: playlist.musics?.map((music: any) => ({
                        id: music.id,
                        cover: music.coverPath 
                            ? { uri: apiClient.getImageUrl(music.coverPath) }
                            : PlaylistCoverDefault,
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
                <LoadingSpinner size={20} color={theme.colors.primary} />
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

    const handleCreatePlaylist = async (title: string, description: string, coverBase64: string | null) => {
        try {
            let coverPath = "";
            
            // Si une image a été sélectionnée, l'uploader d'abord
            if (coverBase64) {
                try {
                    const uploadResult = await ImageService.AddImage(coverBase64, 'image/jpeg');
                    coverPath = uploadResult.filename; // Utiliser le nom du fichier retourné
                    console.log('Image uploadée avec succès:', coverPath);
                } catch (uploadError) {
                    console.error('Erreur lors de l\'upload de l\'image:', uploadError);
                    Alert.alert("Avertissement", "L'image n'a pas pu être uploadée, la playlist sera créée sans image");
                }
            }

            // Préparer les données de la playlist
            const playlistData = {
                id_library: "3",
                title: title,
                isPublic: false,
                description: description,
                cover_path: coverPath || "", // Toujours envoyer cover_path (vide si pas d'image)
                musics: []
            };

            console.log('Données envoyées pour créer la playlist:', playlistData);

            // Créer la playlist
            await PlaylistService.createPlaylist(playlistData);
            setAddPlaylistVisible(false);
            
            // Recharger les playlists
            fetchPlaylists();
        } catch (err) {
            console.error('Erreur lors de la création de la playlist:', err);
            Alert.alert("Erreur", "Impossible de créer la playlist");
        }
    };

    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15, paddingBottom: 150 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                {playlists.map((playlist, key) =>
                    <PlaylistCard key={key} infos={playlist} isSearch={false}></PlaylistCard>
                )}
            </ScrollView>
            

            <AddPlaylistModal
                visible={addPlaylistVisible}
                onClose={() => setAddPlaylistVisible(false)}
                onSubmit={handleCreatePlaylist}
            />
            <Pressable
                    onPress={() => setAddPlaylistVisible(true)}
                    style={{
                        position: 'absolute',
                        bottom: 140,
                        right: 20,
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: theme.colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84
                    }}
                >
                    <MaterialIcons name="add" size={30} color="#fff" />
                </Pressable>
        </View>
    )
}