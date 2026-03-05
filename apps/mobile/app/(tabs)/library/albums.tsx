import projectCard from "@/lib/components/projectCard";
import { useTheme } from "@/lib/theme/provider";
import { Project } from "@/lib/types/types";
import { ScrollView, View, Pressable, Alert } from "react-native";
import { useEffect, useState } from "react";
import { apiClient, ImageService, ArtistService } from "@/lib/api";
import AppText from "@/lib/components/global/appText";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import ProjectCard from "@/lib/components/projectCard";
import { LoadingSpinner } from "@/lib/components/global/BtnConnexion";
import { PlaylistCoverDefault } from "@/lib/constants/images";
import useAuthHook from "@/hook/authHook";

export default function projects() {
    const { theme } = useTheme();
    const { userId } = useAuthHook();
    const [projects, setprojects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchprojects = useCallback(async () => {
        try {
            setLoading(true);
            if (!userId) {
                setprojects([]);
                setError("Utilisateur non connecté");
                return;
            }

            const response: any = await ArtistService.getAllProjectsByUserID(userId);
            const projectsArray = response.projects || [];

            // Convertir les données de l'API au format project du front
            const formattedprojects: Project[] = projectsArray.map((project: any) => ({
                id: project.id,
                cover: project.coverPath
                    ? { uri: apiClient.getImageUrl(project.coverPath) }
                    : require("../../../assets/images/react-logo.png"),
                title: project.title || "project",
                artist: project.artistName,
                color1: "#965F4C",
                color2: "#291A15",
                nbStreams: 0,
                type: "project" as const,
                description: project.description || "",
                nbMusics: project.musics?.length || 0,
                musicList: project.musics?.map((music: any) => ({
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

            setprojects(formattedprojects);
            setError(null);
        } catch (err) {
            console.error('Erreur lors du chargement des projects:', err);
            setError('Impossible de charger les projects');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useFocusEffect(
        useCallback(() => {
            fetchprojects();
        }, [fetchprojects])
    );

    if (loading) {
        return (
            <View style={{ backgroundColor: theme.colors.background, height: "100%", justifyContent: "center", alignItems: "center" }}>
                <LoadingSpinner size={20} color={theme.colors.primary} />
                <AppText style={{ marginTop: 10 }}>Chargement des projects...</AppText>
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

    if (projects.length === 0) {
        return (
            <View style={{ backgroundColor: theme.colors.background, height: "100%", justifyContent: "center", alignItems: "center", padding: 20 }}>
                <AppText color="text2" style={{ textAlign: "center" }}>
                    Aucun album n'as été liké.
                </AppText>
            </View>
        );
    }


    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15, paddingBottom: 150 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                {projects.map((project, key) =>
                    <ProjectCard key={key} infos={project} isSearch={false}></ProjectCard>
                )}
            </ScrollView>

        </View>
    )
}