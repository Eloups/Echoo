import ArtistCard from "@/lib/components/artistCard";
import { useTheme } from "@/lib/theme/provider";
import { Artist } from "@/lib/types/types";
import { ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { ArtistService, apiClient } from "@/lib/api";
import AppText from "@/lib/components/global/appText";
import { LoadingSpinner } from "@/lib/components/global/BtnConnexion";
import { PlaylistCoverDefault } from "@/lib/constants/images";

export default function Artists() {
    const { theme } = useTheme();
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                setLoading(true);
                const userId = 3; // ID utilisateur
                const response: any = await ArtistService.getAllArtistsByUserID(userId);
                
                const artistsArray = response.artists || [];
                
                // Convertir les données de l'API au format Artist
                const formattedArtists: Artist[] = artistsArray.map((artist: any) => ({
                    id: artist.id,
                    cover: artist.imagePath 
                        ? { uri: apiClient.getImageUrl(artist.imagePath) }
                        : PlaylistCoverDefault,
                    title: artist.name,
                    name: artist.name,
                    isVerified: artist.isVerified,
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
                <LoadingSpinner size={20} color={theme.colors.primary} />
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
                    <ArtistCard key={key} infos={artist} isSearch={false}></ArtistCard>
                )}
            </ScrollView>
        </View>
    )
}
