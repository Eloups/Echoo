import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { BaseInfos } from "@/lib/types/types";
import { ScrollView, View } from "react-native";

const placeholderImage = require("../../../assets/images/react-logo.png");

const musicTemp: BaseInfos = {
    cover: placeholderImage,
    title: "CHIHIRO",
    artist: "Billie Eilish",
    color1: "#04131D",
    color2: "#082840",
    nbStreams: 46,
    type: "music"
}

const musicTemp2: BaseInfos = {
    cover: placeholderImage,
    title: "Rich Man",
    artist: "aespa",
    color1: "#000000",
    color2: "#0E0E0E",
    nbStreams: 24,
    type: "music"
}

const musicTemp3: BaseInfos = {
    cover: placeholderImage,
    title: "What do you want from me?",
    artist: "Jann",
    color1: "#965F4C",
    color2: "#291A15",
    nbStreams: 11,
    type: "music"
}

export default function Liked() {
    const { theme } = useTheme();

    const musics: BaseInfos[] = [musicTemp, musicTemp2, musicTemp3];

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
