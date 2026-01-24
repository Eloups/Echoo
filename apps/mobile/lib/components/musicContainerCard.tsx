import { View, Image, StyleSheet, Pressable } from "react-native";
import { BaseInfos } from "../types/types";
import AppText from "./global/appText";
import { router, useSegments } from "expo-router";

type MusicContainerCardProps = {
    infos: BaseInfos,
    isSearch: boolean,
    isHome?: boolean
}

// Composant dédié à l'affichage des playlists et albums
export default function MusicContainerCard(props: MusicContainerCardProps) {
    const segments = useSegments();

    props.isHome ?? false;

    const handlePress = () => {
        // Construire le chemin actuel
        const currentPath = '/' + segments.join('/');
        
        if (props.infos.type === "album" || props.infos.type === "ep" || props.infos.type === "single") {
            router.push({
                pathname: "/(tabs)/album/musiques",
                params: {
                    data: JSON.stringify(props.infos),
                    from: currentPath
                }
            });
        } else if (props.infos.type === "playlist") {
            router.push({
                pathname: "/(tabs)/detail",
                params: {
                    data: JSON.stringify(props.infos),
                    from: currentPath
                }
            });
        }
    };

    const IMAGE_SIZE = 70;

    return (
        <Pressable onPress={handlePress}>
            <View>
                {props.isSearch === false && props.infos.type === "playlist" ? (
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <View style={styles.containerImgPlaylists(IMAGE_SIZE)}>
                            <Image source={props.infos.cover} height={95} width={95} style={styles.imagePlaylist1(IMAGE_SIZE)}></Image>
                            <Image source={props.infos.cover} height={95} width={95} style={styles.imagePlaylist2(IMAGE_SIZE)}></Image>
                            <Image source={props.infos.cover} height={95} width={95} style={styles.imagePlaylist3(IMAGE_SIZE)}></Image>
                        </View>
                        <View style={{ display: "flex", flexDirection: "column" }}>
                            <AppText size={"lg"}>{props.infos.title.length > 36 ? props.infos.title.slice(0, 34) + "..." : props.infos.title}</AppText>
                            <AppText size={"sm"} color="text2">{props.infos.nbMusics ?? "0"} titres</AppText>
                        </View>
                    </View>
                ) :
                    props.isSearch === false && (props.infos.type === "album" || props.infos.type === "ep" || props.infos.type === "single") ? (
                        <View>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                                <View style={styles.containerImgPlaylists(IMAGE_SIZE)}>
                                    <Image source={props.infos.cover} height={95} width={95} style={styles.imagePlaylist1(IMAGE_SIZE)}></Image>
                                </View>
                                <View style={{ display: "flex", flexDirection: "column" }}>
                                    <AppText size={"lg"}>{props.infos.title.length > 36 ? props.infos.title.slice(0, 34) + "..." : props.infos.title}</AppText>
                                    <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>{props.infos.artist.length > 16 ? props.infos.artist.slice(0, 15) + "..." : props.infos.artist}</AppText>
                                </View>
                            </View>
                        </View>
                    ) : (
                        // Pour la recherche dans la page Découvrir
                        <View style={styles.searchContainer}>
                            <Image source={props.infos.cover} height={55} width={55} style={styles.imageMusicSearch}></Image>
                            <View>
                                <AppText size={"md"} style={{ marginTop: 3 }}>{props.infos.title.length > 40 ? props.infos.title.slice(0, 40) + "..." : props.infos.title}</AppText>
                                <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>
                                    {props.infos.type === "playlist" ? "Playlist" : props.infos.type === "album" ? "Album" : props.infos.type === "ep" ? "EP" : "Single"}
                                    {props.infos.artist && ` • ${props.infos.artist.length > 40 ? props.infos.artist.slice(0, 40) + "..." : props.infos.artist}`}
                                </AppText>
                            </View>
                        </View>
                    )}
            </View>
        </Pressable>
    )
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
    },
    imagePlaylist1: (IMAGE_SIZE: number) => ({
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: 5,
        position: "absolute" as const,
        backgroundColor: "#000",
        top: 0,
        left: 0,
        zIndex: 3,
    }),
    imagePlaylist2: (IMAGE_SIZE: number) => ({
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: 5,
        position: "absolute" as const,
        backgroundColor: "#000",
        top: -8,
        opacity: 0.6,
        transform: [{ scale: 0.88 }],
        zIndex: 2,
    }),
    imagePlaylist3: (IMAGE_SIZE: number) => ({
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: 5,
        position: "absolute" as const,
        backgroundColor: "#000",
        top: -16,
        opacity: 0.3,
        transform: [{ scale: 0.75 }],
        zIndex: 1,
    }),
    containerImgPlaylists: (IMAGE_SIZE: number) => ({
        width: IMAGE_SIZE + 20,
        height: IMAGE_SIZE,
        position: "relative" as const,
    })
});
