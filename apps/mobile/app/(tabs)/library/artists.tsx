import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { BaseInfos } from "@/lib/types/baseInfos";
import { ScrollView, View } from "react-native";
import AppText from "@/lib/components/appText";

const ppBillie = require("../../../assets/tempImg/Profils_Artistes/Billie_Eilish.jpg");
const ppAespa = require("../../../assets/tempImg/Profils_Artistes/aespa.jpg");

const artistTemp: BaseInfos = {
    cover: ppBillie,
    title: "Billie Eilish",
    artist: "",
    color1: "#04131D",
    color2: "#082840",
    nbStreams: 46,
    type: "artist"
}

const artistTemp2: BaseInfos = {
    cover: ppAespa,
    title: "aespa",
    artist: "",
    color1: "#000000",
    color2: "#0E0E0E",
    nbStreams: 24,
    type: "artist"
}

export default function Artists() {
    const { theme } = useTheme();

    const artists: BaseInfos[] = [artistTemp, artistTemp2];

    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                {artists.map((artist, key) =>
                    <MusicCard key={key} infos={artist} isSearch={false}></MusicCard>
                )}
            </ScrollView>
        </View>
    )
}
