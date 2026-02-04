import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import AppText from "@/lib/components/global/appText";
import LastSongPlayedCard from "@/lib/components/home_last_song_played_card";
import { Music, Artist, Project } from "@/lib/types/types";
import SectionTitle from "@/lib/components/sectionTitle";
import MusicCard from "@/lib/components/musicCard";
import ProjectCard from "@/lib/components/projectCard";
import MonthArtists from "@/lib/components/monthArtists";
import MonthMusics from "@/lib/components/monthMusics";
import { useEffect, useState, useCallback } from "react";
import { useNavigation, router, useSegments, useFocusEffect } from "expo-router";
import { HomeService } from "@/lib/api/home.service";
import { MusicService, apiClient } from "@/lib/api";

const placeholderImage = require("../../assets/images/react-logo.png");

export default function home() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const segments = useSegments();
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
                    // TODO: Remplacer l'ID hardcodé par l'ID de l'utilisateur connecté
                    const userId = 3;
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
                } catch (error) {
                    console.error("Erreur lors de la récupération des dernières musiques écoutées:", error);
                    setLastListenedMusics([]);
                }
            };

            const fetchLatestReleases = async () => {
                try {
                    // TODO: Remplacer l'ID hardcodé par l'ID de l'utilisateur connecté
                    const userId = 3;
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
                            cover: coverUri,
                            type: apiProject.projectType.toLowerCase(),
                            title: apiProject.title,
                            description: "",
                            artist: "", // TODO: Récupérer le nom de l'artiste si nécessaire
                            musics: []
                        };
                    });
                    
                    setLatestReleases(mappedProjects);
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

            fetchLastListenedMusics();
            fetchLatestReleases();
            fetchMonthArtists();
        }, [])
    );

    const handleAlbumPress = (album: Project) => {
        const currentPath = '/' + segments.join('/');
        router.push({
            pathname: "/(tabs)/detail",
            params: { 
                data: JSON.stringify(album),
                from: currentPath
            }
        });
    };


    const albumTemp: Project = {
        cover: placeholderImage,
        title: "HIT ME HARD AND SOFT",
        artist: "Billie Eilish",
        type: "album",
        description: ""
    }

    const musicTemp: Music = {
        id: 1,
        cover: placeholderImage,
        title: "CHIHIRO",
        artist: "Billie Eilish",
        color1: "#04131D",
        color2: "#082840",
        nbStreams: 46,
        audioFile: "music_1.mp3"
    }

    const musicTemp2: Music = {
        id: 2,
        cover: placeholderImage,
        title: "Rich Man",
        artist: "aespa",
        color1: "#000000",
        color2: "#0E0E0E",
        nbStreams: 24,
        audioFile: "music_2.mp3"
    }

    const musicTemp3: Music = {
        id: 3,
        cover: placeholderImage,
        title: "What do you want from me ?",
        artist: "Jann",
        color1: "#965F4C",
        color2: "#291A15",
        nbStreams: 11,
        audioFile: "music_3.mp3"
    }

    const artist1: Artist = {
        cover: placeholderImage,
        title: "Madison Beer"
    }

    const artist2: Artist = {
        cover: placeholderImage,
        title: "Billie Eilish"
    }

    const artist3: Artist = {
        cover: placeholderImage,
        title: "aespa"
    }

    // TODO : remplacer les infos par celles de la BDD
    const artistList: Artist[] = [artist1, artist2, artist3, artist1, artist2, artist3];
    const musicList: Music[] = [musicTemp, musicTemp2, musicTemp3, musicTemp];
    const releasedRecentlyList: Music[] = [musicTemp, musicTemp2, musicTemp3, musicTemp, musicTemp2, musicTemp3];
    

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingBottom: 100 }}>
                            <SectionTitle text="Derniers morceaux écoutés"></SectionTitle>

            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingHorizontal: 24}}>

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

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }} style={{ paddingLeft: 24 }}>
                {latestReleases.map((project, key) =>
                    <ProjectCard key={key} infos={project} isSearch={false} isHome={true}></ProjectCard>
                )}
            </ScrollView>

            <SectionTitle text="Les artistes du mois"></SectionTitle>

            <MonthArtists artistList={monthArtists}></MonthArtists>
        </ScrollView>
    )
}