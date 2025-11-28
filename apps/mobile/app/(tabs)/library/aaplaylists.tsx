import MusicCard from "@/lib/components/musicCard";
import { useTheme } from "@/lib/theme/provider";
import { BaseInfos } from "@/lib/types/baseInfos";
import { ScrollView, View } from "react-native";

const coverSpongebob = require("../../../assets/tempImg/Covers_Playlists/Spongebob.jpg");

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


export default function Playlists() {
    const { theme } = useTheme();

    const playlists: BaseInfos[] = [musicTemp3, musicTemp3, musicTemp3, musicTemp3, musicTemp3, musicTemp3, musicTemp3, musicTemp3];

    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                {playlists.map((playlist, key) =>
                    <MusicCard key={key} infos={playlist} isSearch={false}></MusicCard>
                )}
            </ScrollView>
        </View>
    )
}