import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { BaseInfos } from "@/lib/types/baseInfos";
import { ScrollView, View } from "react-native";
import AppText from "@/lib/components/appText";

const cover = require("../../../assets/tempImg/Covers_Albums/HMHAS.jpg");
const cover2 = require("../../../assets/tempImg/Covers_Albums/RichMan.webp");

const albumTemp: BaseInfos = {
    cover: cover,
    title: "HIT ME HARD AND SOFT",
    artist: "Billie Eilish",
    color1: "#04131D",
    color2: "#082840",
    nbStreams: 46,
    type: "album"
}

const albumTemp2: BaseInfos = {
    cover: cover2,
    title: "Rich Man",
    artist: "aespa",
    color1: "#000000",
    color2: "#0E0E0E",
    nbStreams: 24,
    type: "album"
}

export default function Albums() {
    const { theme } = useTheme();

    const albums: BaseInfos[] = [albumTemp, albumTemp2];

    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                {albums.map((album, key) =>
                    <MusicCard key={key} infos={album} isSearch={false}></MusicCard>
                )}
            </ScrollView>
        </View>
    )
}
