import { View, Image } from "react-native";
import AppText from "./appText";
import { BaseInfos } from "../types/baseInfos";

type PageProps = {
    music: BaseInfos
}

export default function LastSongPlayedCard(props: PageProps){
    const cover = require("../../assets/tempImg/Covers_Albums/HMHAS.jpg");
    return (
        <View style={{display: "flex", flexDirection: "row", width: 184, gap: 10, backgroundColor: "blue"}}>
            <Image source={props.music.cover} height={42} width={42} style={{height: 42, width: 42}}></Image>
            <View style={{display: "flex"}}>
                <AppText size={"lg"} style={{transform: [{translateY: 3}]}}>{props.music.title}</AppText>
                <AppText size={"xs"} color="text2" style={{transform: [{translateY: -3}]}}>{props.music.artist}</AppText>
            </View>
        </View>
    )
}