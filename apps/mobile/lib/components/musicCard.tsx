import { View, Image, StyleSheet } from "react-native";
import { BaseInfos } from "../types/baseInfos";
import AppText from "./appText";

type PageProps = {
    infos: BaseInfos,
    isArtist: boolean
}

export default function MusicCard(props: PageProps){
    return(
        <View>
            <Image source={props.infos.cover} height={95} width={95} style={props.isArtist == true ? styles.imageArtist : styles.imageMusic}></Image>
            <AppText size={"md"} style={{marginTop: 3}}>{props.infos.title.length > 15 ? props.infos.title.slice(0, 13) + "..." : props.infos.title}</AppText>
            <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>{props.infos.artist.length > 16 ? props.infos.artist.slice(0, 15) + "..." : props.infos.artist}</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    imageMusic: {
        height: 95, 
        width: 95, 
        borderRadius: 5
    },
    imageArtist: {
        height: 95, 
        width: 95, 
        borderRadius: 1000
    }
});