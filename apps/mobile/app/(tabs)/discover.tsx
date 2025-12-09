import MusicCard from "@/lib/components/musicCard";
import { BaseInfos } from "@/lib/types/types";
import { Button, ScrollView, TextInput, View, StyleSheet } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import React from "react";
import SectionTitle from "@/lib/components/sectionTitle";
import { Background } from "@react-navigation/elements";
import { themes } from "@/lib/theme";
import Feather from '@expo/vector-icons/Feather';

// TODO : A supprimer après avoir intégrer l'appel à la BDD
const cover = require("../../assets/tempImg/Covers_Albums/HMHAS.jpg");
const cover2 = require("../../assets/tempImg/Covers_Albums/RichMan.webp");
const cover3 = require("../../assets/tempImg/Covers_Albums/Jann.jpg");
const PPartist1 = require("../../assets/tempImg/Profils_Artistes/Madison_beer.jpg");

export default function Discover() {
    // Appel à la gestion de thème pour les couleurs
    const { theme, toggleTheme } = useTheme();

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
        cover: cover3,
        title: "What do you want from me ?",
        artist: "Jann",
        color1: "#965F4C",
        color2: "#291A15",
        nbStreams: 11,
        type: "music"
    }

    const artist1: BaseInfos = {
        cover: PPartist1,
        title: "Madison Beer",
        artist: "",
        color1: "",
        color2: "",
        type: "artist"
    }
    
    
    const album1: BaseInfos = {
        cover: cover3,
        title: "I store my fear and my pain in the nape of my neck",
        artist: "Jann",
        color1: "",
        color2: "",
        type: "album"
    }

    // TODO : récupérer les infos de la BDD pour remplir ces listes
    const releasedRecentlyList: BaseInfos[] = [musicTemp, musicTemp2, musicTemp3, musicTemp, musicTemp2, musicTemp3];
    const forYouList: BaseInfos[] = [artist1, musicTemp2, musicTemp3, artist1, musicTemp2, musicTemp3];
    const topsList: BaseInfos[] = [musicTemp, musicTemp2, musicTemp3, musicTemp, musicTemp2, musicTemp3];
    const searchList: BaseInfos[] = [artist1, musicTemp2, album1];

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
                        {releasedRecentlyList.map((music, key) =>
                            <MusicCard key={key} infos={music}  isSearch={false} isHome={true}></MusicCard>
                        )}
                    </ScrollView>

                    <SectionTitle text="Pour vous"></SectionTitle>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }} style={{ paddingLeft: 24 }}>
                        {forYouList.map((music, key) =>
                            <MusicCard key={key} infos={music}  isSearch={false} isHome={true}></MusicCard>
                        )}
                    </ScrollView>

                    <SectionTitle text="Tops"></SectionTitle>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }} style={{ paddingLeft: 24 }}>
                        {topsList.map((music, key) =>
                            <MusicCard key={key} infos={music}  isSearch={false} isHome={true}></MusicCard>
                        )}
                    </ScrollView>
                </View>
            ) :
                <View>
                    <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                        {searchList.map((music, key) =>
                            <MusicCard key={key} infos={music}  isSearch={true} isHome={true}></MusicCard>
                        )}
                    </ScrollView>
                </View>}
        </View>
    )

}

