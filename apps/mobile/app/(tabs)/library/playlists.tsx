import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { BaseInfos } from "@/lib/types/baseInfos";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

const likedTitleCover = require("../../../assets/img/likedMusic.png");
const coverSpongebob = require("../../../assets/tempImg/Covers_Playlists/Spongebob.jpg");
const cover = require("../../../assets/tempImg/Covers_Albums/HMHAS.jpg");
const cover2 = require("../../../assets/tempImg/Covers_Albums/RichMan.webp");
const cover3 = require("../../../assets/tempImg/Covers_Albums/Jann.jpg");

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
    }

    //Ne pas supprimer
    const likedTitles: BaseInfos = {
        cover: likedTitleCover,
        title: "Titres Likés",
        artist: "",
        color1: "",
        color2: "",
        nbStreams: 0,
        type: "playlist",
        nbMusics: 22,
    }

    

export default function Playlists(){
    const { theme, toggleTheme } = useTheme();

    const playlists: BaseInfos[] = [likedTitles, musicTemp3];
    
    
    const navigation = useNavigation();
        useEffect(() => {
            navigation.setOptions({
                title: "Bibilothèque",
                subtitle: "Playlists",
            } as any);
        }, [navigation]);
    return(
        <View style={{backgroundColor: theme.colors.background, height: "100%"}}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                {playlists.map((playlist, key) =>
                    <MusicCard key={key} infos={playlist}  isSearch={false}></MusicCard>
                )}
            </ScrollView>
        </View>
    )
}