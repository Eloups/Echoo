import { View, Image, StyleSheet, Pressable } from "react-native";
import { Playlist } from "../types/types";
import AppText from "./global/appText";
import { router, useSegments } from "expo-router";

type PlaylistCardProps = {
    infos: Playlist,
    isSearch?: boolean
}

// Composant dédié à l'affichage des playlists
export default function PlaylistCard(props: PlaylistCardProps) {
    const segments = useSegments();
    const isSearch = props.isSearch ?? false;

    const handlePress = () => {
        const currentPath = '/' + segments.join('/');
        
        router.push({
            pathname: "/(tabs)/detail",
            params: {
                data: JSON.stringify(props.infos),
                from: currentPath
            }
        });
    };

    const IMAGE_SIZE = 70;

    return (
        <Pressable onPress={handlePress}>
            <View>
                {isSearch ? (
                    // Pour la recherche dans la page Découvrir
                    <View style={styles.searchContainer}>
                        <Image source={props.infos.cover} height={55} width={55} style={styles.imageMusicSearch}></Image>
                        <View>
                            <AppText size={"md"} style={{ marginTop: 3 }}>
                                {props.infos.title.length > 40 ? props.infos.title.slice(0, 40) + "..." : props.infos.title}
                            </AppText>
                            <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>
                                Playlist
                            </AppText>
                        </View>
                    </View>
                ) : (
                    // Vue normale avec 3 images superposées
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <View style={containerImgPlaylists(IMAGE_SIZE)}>
                            <Image source={props.infos.cover} height={95} width={95} style={imagePlaylist1(IMAGE_SIZE)}></Image>
                            <Image source={props.infos.cover} height={95} width={95} style={imagePlaylist2(IMAGE_SIZE)}></Image>
                            <Image source={props.infos.cover} height={95} width={95} style={imagePlaylist3(IMAGE_SIZE)}></Image>
                        </View>
                        <View style={{ display: "flex", flexDirection: "column" }}>
                            <AppText size={"lg"}>
                                {props.infos.title.length > 36 ? props.infos.title.slice(0, 34) + "..." : props.infos.title}
                            </AppText>
                        </View>
                    </View>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    imageMusicSearch: {
        height: 55,
        width: 55,
        borderRadius: 5
    },
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    }
});

const imagePlaylist1 = (IMAGE_SIZE: number) => ({
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
    position: "absolute" as const,
    backgroundColor: "#000",
    top: 0,
    left: 0,
    zIndex: 3,
});

const imagePlaylist2 = (IMAGE_SIZE: number) => ({
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
    position: "absolute" as const,
    backgroundColor: "#000",
    top: -8,
    opacity: 0.6,
    transform: [{ scale: 0.88 }],
    zIndex: 2,
});

const imagePlaylist3 = (IMAGE_SIZE: number) => ({
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
    position: "absolute" as const,
    backgroundColor: "#000",
    top: -16,
    opacity: 0.3,
    transform: [{ scale: 0.75 }],
    zIndex: 1,
});

const containerImgPlaylists = (IMAGE_SIZE: number) => ({
    width: IMAGE_SIZE + 20,
    height: IMAGE_SIZE,
    position: "relative" as const,
});
