import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { BaseInfos } from "@/lib/types/baseInfos";
import { ScrollView, View } from "react-native";
import AppText from "@/lib/components/appText";

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
    cover: cover3,
    title: "Roses",
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
