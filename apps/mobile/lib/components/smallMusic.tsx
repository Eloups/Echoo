import { View, Image } from "react-native"
import { BaseInfos } from "../types/baseInfos"
import AppText from "./global/appText"
import { LinearGradient } from "expo-linear-gradient"
import { routePatternToRegex } from "expo-router/build/fork/getStateFromPath-forks"

type Pageprops = {
    music: BaseInfos
}

export default function SmallMuisc(props: Pageprops){
    return(
        <LinearGradient colors={[props.music.color1, props.music.color2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{flex: 1, flexDirection: "row", alignItems: "center", gap: 15, alignSelf: 'stretch', padding: 5, borderRadius: 5}}>
            <Image source={props.music.cover} style={{height: 46, width: 46, borderRadius: 2}}></Image>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={{display: "flex", flexDirection: "column"}}>
                    <AppText size="lg" style={{ transform: [{ translateY: 3 }]}}>{props.music.title}</AppText>
                    <AppText size="md" color="text2" style={{ transform: [{ translateY: -3 }]}}>{props.music.artist}</AppText>
                </View>
                <View style={{paddingRight: 5}}>
                    <AppText size={"sm"}>{props.music.nbStreams} écoutes</AppText>
                </View>
            </View>
        </LinearGradient>
    )
}