import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "@/lib/theme/provider";
import AppText from "@/lib/components/appText";
import LastSongPlayedCard from "@/lib/components/home_last_song_played_card";
import { BaseInfos } from "@/lib/types/baseInfos";

export default function home() {
    const { theme, toggleTheme } = useTheme();
    const cover = require("../../assets/tempImg/Covers_Albums/HMHAS.jpg");

    const albumTemp: BaseInfos = {
        cover: cover,
        title: "HIT ME HARD AND SOFT",
        artist: "Billie Eilish"
    }

    const musicTemp: BaseInfos = {
        cover: cover,
        title: "CHIHIRO",
        artist: "Billie Eilish"
    }

    return (
        <View style={styles.view}>
            <View style={{display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "row", alignSelf: 'stretch', gap: 17, marginTop: 10}}>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 3}}>
                    <AppText size={"lg"} style={{marginBottom: 10}}>Dernier album écouté</AppText>
                    <Image source={albumTemp.cover} style={{ width: 144, height: 144, borderRadius: 5}} />
                    <AppText size={"md"}>{albumTemp.title}</AppText>
                    <AppText size={"xs"} color="text2">{albumTemp.artist}</AppText>
                </View>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 3}}>
                    <AppText size={"lg"} style={{marginBottom: 10}}>Derniers morceaux écoutés</AppText>
                    <View style={{display: "flex", gap: 9}}>
                        <LastSongPlayedCard music={musicTemp}></LastSongPlayedCard>
                        <LastSongPlayedCard music={musicTemp}></LastSongPlayedCard>
                        <LastSongPlayedCard music={musicTemp}></LastSongPlayedCard>
                    </View>
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
    },


});