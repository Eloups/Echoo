import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import AppText from "@/lib/components/appText";
import LastSongPlayedCard from "@/lib/components/home_last_song_played_card";
import { BaseInfos } from "@/lib/types/baseInfos";
import SectionTitle from "@/lib/components/sectionTitle";
import MusicCard from "@/lib/components/musicCard";
const cover = require("../../assets/tempImg/Covers_Albums/HMHAS.jpg");
const cover2 = require("../../assets/tempImg/Covers_Albums/RichMan.webp");
const cover3 = require("../../assets/tempImg/Covers_Albums/Jann.jpg");
const PPartist1 = require("../../assets/tempImg/Profils_Artistes/Madison_beer.jpg");

export default function home() {
    const { theme, toggleTheme } = useTheme();


    const albumTemp: BaseInfos = {
        cover: cover,
        title: "HIT ME HARD AND SOFT",
        artist: "Billie Eilish"
    }

    const musicTemp: BaseInfos = {
        cover: cover,
        title: "CHIHIRO",
        artist: "Billie Eilish",
        color1: "#04131D",
        color2: "#082840"
    }

    const musicTemp2: BaseInfos = {
        cover: cover2,
        title: "Rich Man",
        artist: "aespa",
        color1: "#000000",
        color2: "#0E0E0E"
    }

    const musicTemp3: BaseInfos = {
        cover: cover3,
        title: "What do you want from me ?",
        artist: "Jann",
        color1: "#965F4C",
        color2: "#291A15"
    }
    
    const artist1: BaseInfos = {
        cover: PPartist1,
        title: "Madison Beer",
        artist: "",
        color1: "#965F4C",
        color2: "#291A15"
    }

    return (
        <ScrollView>
            <View style={{display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "row", alignSelf: 'stretch', gap: 17, marginTop: 10}}>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 3}}>
                    <AppText size={"lg"} style={{marginBottom: 10}}>Dernier album écouté</AppText>
                    <Image source={albumTemp.cover} style={{ width: 144, height: 144, borderRadius: 5}} />
                    <AppText size={"md"}>{albumTemp.title}</AppText>
                    <AppText size={"sm"} color="text2">{albumTemp.artist}</AppText>
                </View>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 3}}>
                    <AppText size={"lg"} style={{marginBottom: 10}}>Derniers morceaux écoutés</AppText>
                    <View style={{display: "flex", gap: 9}}>
                        <LastSongPlayedCard music={musicTemp}></LastSongPlayedCard>
                        <LastSongPlayedCard music={musicTemp2}></LastSongPlayedCard>
                        <LastSongPlayedCard music={musicTemp3}></LastSongPlayedCard>
                    </View>
                </View>
            </View>
            <SectionTitle text="Dernières sorties"></SectionTitle>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 10}} style={{paddingLeft: 24}}>
                <MusicCard infos={musicTemp3} isArtist={false}></MusicCard>
                <MusicCard infos={musicTemp2} isArtist={false}></MusicCard>
                <MusicCard infos={artist1} isArtist={true}></MusicCard>
                <MusicCard infos={musicTemp} isArtist={false}></MusicCard>
                <MusicCard infos={musicTemp2} isArtist={false}></MusicCard>
                <MusicCard infos={musicTemp3} isArtist={false}></MusicCard>
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
    },


});