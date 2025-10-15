import { View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import AppText from "./appText";
import { BaseInfos } from "../types/baseInfos";

type PageProps = {
    music: BaseInfos
}

export default function LastSongPlayedCard(props: PageProps) {
    const colors = [
        props.music.color1 || '#1a1a1a',
        props.music.color2 || '#2a2a2a'
    ];

    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
                display: "flex",
                flexDirection: "row",
                width: 184,
                gap: 10,
                borderRadius: 5
            }}
        >
            <Image 
                source={props.music.cover} 
                height={42} 
                width={42} 
                style={{ height: 42, width: 42 }}
            />
            <View style={{ display: "flex" }}>
                <AppText size={"lg"} style={{ transform: [{ translateY: 3 }] }}>
                    {props.music.title.length > 16 ? props.music.title.slice(0, 15) + "..." : props.music.title}
                </AppText>
                <AppText size={"xs"} color="text2" style={{ transform: [{ translateY: -3 }] }}>
                    {props.music.artist}
                </AppText>
            </View>
        </LinearGradient>
    );
}