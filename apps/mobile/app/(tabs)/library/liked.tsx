import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { Music } from "@/lib/types/types";
import { ScrollView, View } from "react-native";

const placeholderImage = require("../../../assets/images/react-logo.png");

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
    title: "What do you want from me?",
    artist: "Jann",
    color1: "#965F4C",
    color2: "#291A15",
    nbStreams: 11,
    audioFile: "music_3.mp3"
}

export default function Liked() {
    const { theme } = useTheme();

    const musics: Music[] = [musicTemp, musicTemp2, musicTemp3];

    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                {musics.map((music, key) =>
                    <MusicCard key={key} infos={music} isSearch={false}></MusicCard>
                )}
            </ScrollView>
        </View>
    )
}
