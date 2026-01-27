import MusicCard from "@/lib/components/musicCard";
import ArtistCard from "@/lib/components/artistCard";
import PlaylistCard from "@/lib/components/playlistCard";
import ProjectCard from "@/lib/components/projectCard";
import { Music, Artist } from "@/lib/types/types";
import { Button, ScrollView, TextInput, View, StyleSheet } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import React from "react";
import SectionTitle from "@/lib/components/sectionTitle";
import { Background } from "@react-navigation/elements";
import { themes } from "@/lib/theme";
import Feather from '@expo/vector-icons/Feather';

const placeholderImage = require("../../assets/images/react-logo.png");

// Type guards pour différencier les types
const isArtist = (item: Music | Artist): item is Artist => {
    return !('id' in item && 'audioFile' in item);
};

export default function Discover() {
    // Appel à la gestion de thème pour les couleurs
    const { theme, toggleTheme } = useTheme();

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
    
    // TODO : récupérer les infos de la BDD pour remplir ces listes
    const releasedRecentlyList: (Music | Artist)[] = [musicTemp, musicTemp2, musicTemp3, musicTemp, musicTemp2, musicTemp3];
    const forYouList: (Music | Artist)[] = [artist1, musicTemp2, musicTemp3, artist1, musicTemp2, musicTemp3];
    const topsList: (Music | Artist)[] = [musicTemp, musicTemp2, musicTemp3, musicTemp, musicTemp2, musicTemp3];
    const searchList: (Music | Artist)[] = [artist1, musicTemp2];

    // Variable qui gère le champ de recherche
    const [searchField, setSearchField] = React.useState("");

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
                        {releasedRecentlyList.map((item, key) =>
                            isArtist(item) ? 
                                <ArtistCard key={key} infos={item} isSearch={false} isHome={true}></ArtistCard> :
                                <MusicCard key={key} infos={item} isSearch={false} isHome={true}></MusicCard>
                        )}
                    </ScrollView>

                    <SectionTitle text="Pour vous"></SectionTitle>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }} style={{ paddingLeft: 24 }}>
                        {forYouList.map((item, key) =>
                            isArtist(item) ? 
                                <ArtistCard key={key} infos={item} isSearch={false} isHome={true}></ArtistCard> :
                                <MusicCard key={key} infos={item} isSearch={false} isHome={true}></MusicCard>
                        )}
                    </ScrollView>

                    <SectionTitle text="Tops"></SectionTitle>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }} style={{ paddingLeft: 24 }}>
                        {topsList.map((item, key) =>
                            isArtist(item) ? 
                                <ArtistCard key={key} infos={item} isSearch={false} isHome={true}></ArtistCard> :
                                <MusicCard key={key} infos={item} isSearch={false} isHome={true}></MusicCard>
                        )}
                    </ScrollView>
                </View>
            ) :
                <View>
                    <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                        {searchList.map((item, key) =>
                            isArtist(item) ? 
                                <ArtistCard key={key} infos={item} isSearch={true} isHome={true}></ArtistCard> :
                                <MusicCard key={key} infos={item} isSearch={true} isHome={true}></MusicCard>
                        )}
                    </ScrollView>
                </View>}
        </View>
    )

}

