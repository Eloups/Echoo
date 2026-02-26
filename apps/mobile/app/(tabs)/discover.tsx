import MusicCard from "@/lib/components/musicCard";
import ArtistCard from "@/lib/components/artistCard";
import { Music, Artist, Project } from "@/lib/types/types";
import { ScrollView, TextInput, View, StyleSheet } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import React, { useState, useEffect } from "react";
import SectionTitle from "@/lib/components/sectionTitle";
import Feather from '@expo/vector-icons/Feather';
import { HomeService, SearchList } from "@/lib/api/home.service";
import { apiClient, MusicService } from "@/lib/api";
import ProjectCard from "@/lib/components/projectCard";

const placeholderImage = require("../../assets/images/react-logo.png");

// Type guards pour différencier les types
const isArtist = (item: Music | Artist): item is Artist => {
    return !('id' in item && 'audioFile' in item);
};


export default function Discover() {
    // Appel à la gestion de thème pour les couleurs
    const { theme, toggleTheme } = useTheme();

    const [latestReleases, setLatestReleases] = useState<Project[]>([]);
    const [searchList, setSearchList] = useState<SearchList>();

        // Variable qui gère le champ de recherche
    const [searchField, setSearchField] = React.useState("");

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
                    } catch (error) {
                        console.error("Erreur lors de la récupération des dernières sorties:", error);
                    }
                };

    useEffect(() => {
        fetchLatestReleases();
    }, []);

    useEffect(() => {

    const trimmed = searchField.trim();

    // 1️⃣ Si champ vide → reset
    if (trimmed.length === 0) {
        setSearchList(undefined);
        return;
    }

    // 2️⃣ Si moins de 3 caractères → ne pas appeler l’API
    if (trimmed.length < 3) {
        return;
    }

    // 3️⃣ Debounce
    const debounceTimer = setTimeout(async () => {
        try {
            const data = await HomeService.searchInDB(trimmed);
            console.log
            const safeData = {
                ...data,
                musics: data.musics.map(music => ({
                    ...music,
                    artist: music.nameArtist ?? "Artiste inconnu",
                    cover:"RadicalOptimism.jpg",
                    type: "music"
                }
            )
        )
};

setSearchList(safeData);
        } catch (error: any) {

            // Si jamais le backend renvoie quand même une 400
            if (error?.response?.status === 400) {
                console.warn("Recherche trop courte");
                return;
            }

            console.error("Erreur recherche :", error);
        }
    }, 500);

    return () => clearTimeout(debounceTimer);

}, [searchField]);


    const styles = StyleSheet.create({
        searchBtn: {
            height: 39,
            width: 39,
            borderRadius: 1000,
            backgroundColor: theme.colors.primary,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        searchInput: {
            height: "100%",
            width: "85%",
            borderColor: theme.colors.primary, borderWidth: 2,
            borderRadius: 5,
            color: theme.colors.text,
            paddingLeft: 10,
            paddingRight: 10
        },
        searchScrollView: {

        }
    });

    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <View style={{ height: 43, display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: 21, paddingRight: 21 }} >
                <TextInput style={styles.searchInput} onChangeText={setSearchField}></TextInput>
                <View style={styles.searchBtn}>
                    <Feather name="search" size={24} color={theme.colors.text} />
                </View>
            </View>

            {searchField == "" ? (
                <View>
                    <SectionTitle text="Dernières sorties"></SectionTitle>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }} style={{ paddingLeft: 24 }}>
                        {latestReleases.map((item, key) =>
                            <ProjectCard key={key} infos={item} isSearch={false} isHome={true}></ProjectCard>
                        )}
                    </ScrollView>
                </View>
            ) :
                <View>
                    <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                        {searchList?.artists.map((item, key) => (
                            <ArtistCard key={`artist-${key}`} infos={item} isSearch={true} isHome={true} />
                        ))}

                        {searchList?.musics.map((item, key) => (
                            <MusicCard key={`music-${key}`} infos={item} isSearch={true} isHome={true} />
                        ))}

                        {searchList?.projects.map((item, key) => (
                            <ProjectCard key={`project-${key}`} infos={item} isSearch={true} isHome={true} />
                        ))}
                    </ScrollView>
                </View>}
        </View>
    )

}

