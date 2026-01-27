import { View, Image } from "react-native"
import { Artist } from "../types/types"
import AppText from "./global/appText"

type Pageprops = {
    artist: Artist
}

export default function SmallArtist(props: Pageprops){
    return(
        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 15, maxWidth: 150, width: 150}}>
            <Image source={props.artist.cover} style={{height: 58, width: 58, borderRadius: 1000}}></Image>
            <AppText size="lg">{props.artist.title}</AppText>
        </View>
    )
}