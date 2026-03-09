import { View, Image, Pressable } from "react-native"
import { Artist } from "../types/types"
import AppText from "./global/appText"
import { router, useSegments } from "expo-router"

type Pageprops = {
    artist: Artist
}

export default function SmallArtist(props: Pageprops){
    const segments = useSegments();

    const handlePress = () => {
        // Construire le chemin actuel
        const currentPath = '/' + segments.join('/');
        
        router.push({
            pathname: "/(tabs)/artist/presentation",
            params: {
                artistId: props.artist.id,
                title: props.artist.title,
                data: JSON.stringify(props.artist),
                from: currentPath
            }
        });
    };

    return(
        <Pressable onPress={handlePress}>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 15, maxWidth: 150, width: 150}}>
                <Image source={props.artist.cover} style={{height: 58, width: 58, borderRadius: 1000}}></Image>
                <AppText size="lg">{props.artist.title}</AppText>
            </View>
        </Pressable>
    )
}