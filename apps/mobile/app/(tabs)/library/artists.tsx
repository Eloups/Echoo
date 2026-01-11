import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { BaseInfos } from "@/lib/types/types";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { ArtistService, apiClient } from "@/lib/api";
import AppText from "@/lib/components/global/appText";

export default function Artists() {
    const { theme } = useTheme();
    const [artists, setArtists] = useState<BaseInfos[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                setLoading(true);
                const userId = 3; // ID utilisateur
                const response: any = await ArtistService.getAllArtistsByUserID(userId);
                
                
                // La réponse contient un objet avec une clé "artists" qui est un tableau
                const artistsArray = response.artists || [];
                
                // Convertir les données de l'API au format BaseInfos
                const formattedArtists: BaseInfos[] = artistsArray.map((artist: any) => ({
                    id: artist.id,
                    cover: artist.imagePath 
                        ? { uri: apiClient.getImageUrl(artist.imagePath) }
                        : require("../../../assets/images/react-logo.png"),
                    title: artist.name,
                    artist: artist.isVerified ? "Vérifié" : "",
                    color1: "#04131D",
                    color2: "#082840",
                    nbStreams: 0,
                    type: "artist" as const,
                    description: artist.description
                }));
                
                setArtists(formattedArtists);
            } catch (err) {
                console.error('Erreur lors du chargement des artistes:', err);
                setError('Impossible de charger les artistes');
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    if (loading) {
        return (
            <View style={{ backgroundColor: theme.colors.background, height: "100%", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <AppText style={{ marginTop: 10 }}>Chargement des artistes...</AppText>
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
                {artists.map((artist, key) =>
                    <MusicCard key={key} infos={artist} isSearch={false}></MusicCard>
                )}
            </ScrollView>
        </View>
    )
}
