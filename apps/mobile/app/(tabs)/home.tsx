import { View, ScrollView } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import AppText from "@/lib/components/global/appText";
import LastSongPlayedCard from "@/lib/components/home_last_song_played_card";
import { Music, Artist, Project } from "@/lib/types/types";
import SectionTitle from "@/lib/components/sectionTitle";
import ProjectCard from "@/lib/components/projectCard";
import MonthArtists from "@/lib/components/monthArtists";
import { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "expo-router";
import { HomeService } from "@/lib/api/home.service";
import { MusicService, apiClient } from "@/lib/api";
import { useGlobalHook } from "@/hook";
import { PlaylistCoverDefault } from "@/lib/constants/images";
import { useAuthHook } from "@/hook/authHook";

const placeholderImage = PlaylistCoverDefault;

export default function Home() {
    const { theme } = useTheme();
    const { user } = useGlobalHook();
    const { userId } = useAuthHook();

    const navigation = useNavigation();
    const [lastListenedMusics, setLastListenedMusics] = useState<Music[]>([]);
    const [latestReleases, setLatestReleases] = useState<Project[]>([]);
    const [monthArtists, setMonthArtists] = useState<Artist[]>([]);

    useEffect(() => {
        navigation.setOptions({
            title: "Accueil",
            subtitle: "",
        } as any);
    }, [navigation]);

    useFocusEffect(

        useCallback(() => {
            const fetchLastListenedMusics = async () => {

                try {
                    if (userId) {

                        // TODO: Remplacer l'ID hardcodé par l'ID de l'utilisateur connecté
                        const data = await HomeService.getLastListenedMusics(userId);

                        // Vérifier si des musiques ont été retournées
                        if (!data.musics || data.musics.length === 0) {
                            setLastListenedMusics([]);
                            return;
                        }

                        // Récupérer les covers pour chaque musique
                        const mappedMusics: Music[] = await Promise.all(
                            data.musics.map(async (apiMusic) => {
                                let coverUri = placeholderImage;

                                try {
                                    const coverData = await MusicService.getMusicCoverPath(apiMusic.id);
                                    if (coverData.cover_path) {
                                        coverUri = { uri: apiClient.getImageUrl(coverData.cover_path) };
                                    }
                                } catch (error) {
                                    console.error(`Erreur lors de la récupération de la cover pour la musique ${apiMusic.id}:`, error);
                                }

                                return {
                                    id: apiMusic.id,
                                    title: apiMusic.title,
                                    artist: apiMusic.nameArtist || "Artiste inconnu",
                                    cover: coverUri,
                                    color1: "#04131D", // TODO: Générer ou récupérer les couleurs depuis l'API
                                    color2: "#082840",
                                    duration: apiMusic.duration,
                                    nbStreams: apiMusic.nbStreams,
                                    audioFile: apiMusic.filePath
                                };
                            })
                        );

                        setLastListenedMusics(mappedMusics);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des dernières musiques écoutées:", error);
                    setLastListenedMusics([]);
                }
            };

            const fetchLatestReleases = async () => {
                try {
                    if (userId) {
                        const data = await HomeService.getFollowedArtistsReleases(userId);

                        //Vérification de la data
                        if (!data || !data.projects || data.projects.length === 0) {
                            setLatestReleases([]);
                            return;
                        }
                        // Mapper les projets de l'API vers le type Project
                        const mappedProjects: Project[] = data.projects.map((apiProject) => {
                            let coverUri = placeholderImage;

                            if (apiProject.coverPath) {
                                coverUri = { uri: apiClient.getImageUrl(apiProject.coverPath) };
                            }

                            return {
                                id: apiProject.id,
                                cover: coverUri,
                                type: apiProject.projectType.toLowerCase(),
                                title: apiProject.title,
                                description: "",
                                artist: "Artiste inconnu",
                                musics: []
                            } as Project;
                        });

                        setLatestReleases(mappedProjects);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des dernières sorties:", error);
                }
            };

            const fetchMonthArtists = async () => {
                try {
                    const data = await HomeService.getMonthArtists();

                    //Vérification de la data
                    if (!data || !data.artists || data.artists.length === 0) {
                        setMonthArtists([]);
                        return;
                    }
                    // Mapper les artistes de l'API vers le type Artist
                    const mappedArtists: Artist[] = data.artists.map((apiArtist) => {
                        let coverUri = placeholderImage;

                        if (apiArtist.imagePath) {
                            coverUri = { uri: apiClient.getImageUrl(apiArtist.imagePath) };
                        }

                        return {
                            id: apiArtist.id,
                            cover: coverUri,
                            title: apiArtist.name
                        };
                    });

                    setMonthArtists(mappedArtists);
                } catch (error) {
                    console.error("Erreur lors de la récupération des artistes du mois:", error);
                }
            };

            if (user && user.id) {
                fetchLastListenedMusics();
                fetchLatestReleases();
                fetchMonthArtists();
            }
        }, [user, userId])
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingBottom: 100 }}>
            <SectionTitle text="Derniers morceaux écoutés"></SectionTitle>

            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}>

                {lastListenedMusics.length > 0 ? (
                    <View style={{ display: "flex", gap: 9, width: '100%' }}>
                        {lastListenedMusics.slice(0, 3).map((music, index) => (
                            <LastSongPlayedCard key={music.id} music={music}></LastSongPlayedCard>
                        ))}
                    </View>
                ) : (
                    <View style={{ width: '100%', paddingVertical: 20, alignItems: 'center' }}>
                        <AppText size={"md"} color="text2">Aucune musique écoutée récemment</AppText>
                    </View>
                )}
            </View>
            <SectionTitle text="Dernières sorties"></SectionTitle>

            {latestReleases.length > 0 ? (
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }} style={{ paddingLeft: 24 }}>
                    {latestReleases.map((project, key) =>
                        <ProjectCard key={key} infos={project} isSearch={false} isHome={true}></ProjectCard>
                    )}
                </ScrollView>
            ) : (
                <View style={{ width: '100%', paddingVertical: 20, alignItems: 'center', paddingHorizontal: 24 }}>
                    <AppText size={"md"} color="text2">Likez des artistes pour voir leur dernières sorties</AppText>
                </View>
            )}

            <SectionTitle text="Les artistes du mois"></SectionTitle>

            <MonthArtists artistList={monthArtists}></MonthArtists>
        </ScrollView>
    )
}