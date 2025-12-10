import { View, Image, StyleSheet, Pressable } from "react-native";
import { BaseInfos } from "../types/types";
import AppText from "./global/appText";
import { isSearchBarAvailableForCurrentPlatform, SearchBar } from "react-native-screens";
import { themes } from "../theme";
import { useTheme } from "../theme/provider";
import { cloneElement } from "react";
import { router, useSegments } from "expo-router";

type PageProps = {
    infos: BaseInfos,
    isSearch: boolean,
    isHome?: boolean
}

// Permet d'afficher une musique, un projet ou un artiste en fonction du paramètre infos.type
export default function MusicCard(props: PageProps) {
    const { theme, toggleTheme } = useTheme();
    const segments = useSegments();

    props.isHome ?? false;

    const handlePress = () => {
        // Construire le chemin actuel
        const currentPath = '/' + segments.join('/');
        
        if (props.infos.type === "artist") {
            router.push({
                pathname: "/(tabs)/artist/presentation",
                params: {
                    title: props.infos.title,
                    data: JSON.stringify(props.infos),
                    from: currentPath
                }
            });
        } else if (props.infos.type === "album" || props.infos.type === "ep" || props.infos.type === "single") {
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

    return (
        <Pressable onPress={handlePress}>
            <View>
                {props.isSearch == false && (props.infos.type == "music" || props.infos.type == "artist") && props.isHome == true ? (
                    <View>
                        <Image source={props.infos.cover} height={95} width={95} style={props.infos.type == "artist" ? styles.imageArtist : styles.imageMusic}></Image>
                        <AppText size={"md"} style={{ marginTop: 3 }}>{props.infos.title.length > 15 ? props.infos.title.slice(0, 13) + "..." : props.infos.title}</AppText>
                        <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>{props.infos.artist.length > 16 ? props.infos.artist.slice(0, 15) + "..." : props.infos.artist}</AppText>
                    </View>
                ) :
                    props.isSearch == false && props.infos.type == "playlist" ? (
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                            <View style={styles.containerImgPlaylists}>
                                <Image source={props.infos.cover} height={95} width={95} style={styles.imagePlaylist1}></Image>
                                <Image source={props.infos.cover} height={95} width={95} style={styles.imagePlaylist2}></Image>
                                <Image source={props.infos.cover} height={95} width={95} style={styles.imagePlaylist3}></Image>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column" }}>
                                <AppText size={"lg"}>{props.infos.title.length > 36 ? props.infos.title.slice(0, 34) + "..." : props.infos.title}</AppText>
                                <AppText size={"sm"} color="text2">{props.infos.nbMusics ?? "0"} titres</AppText>
                            </View>
                        </View>
                    ) :
                        props.isSearch == false && props.infos.type == "album" ? (
                            <View>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                                    <View style={styles.containerImgPlaylists}>
                                        <Image source={props.infos.cover} height={95} width={95} style={styles.imagePlaylist1}></Image>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "column" }}>
                                        <AppText size={"lg"}>{props.infos.title.length > 36 ? props.infos.title.slice(0, 34) + "..." : props.infos.title}</AppText>
                                        <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>{props.infos.artist.length > 16 ? props.infos.artist.slice(0, 15) + "..." : props.infos.artist}</AppText>
                                    </View>
                                </View>
                            </View>

                        )
                            : (
                                // Pour la recherche dans la page Découvrir
                                <View style={styles.searchContainer}>
                                    <Image source={props.infos.cover} height={95} width={95} style={props.infos.type == "artist" ? styles.imageArtistSearch : styles.imageMusicSearch}></Image>
                                    <View>
                                        <AppText size={"md"} style={{ marginTop: 3 }}>{props.infos.title.length > 40 ? props.infos.title.slice(0, 40) + "..." : props.infos.title}</AppText>

                                        {props.infos.type != "artist" ? (<AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>{props.infos.type == "music" ? ("Morceau") : props.infos.type == "album" ? ("Album") : props.infos.type == "ep" ? ("EP") : ("Single")}  <View style={{ backgroundColor: theme.colors.text2, width: 3, height: 3, borderRadius: 10, transform: "translateY(-1px)" }}></View>  {props.infos.artist.length > 40 ? props.infos.artist.slice(0, 40) + "..." : props.infos.artist}</AppText>) : <></>}
                                    </View>
                                </View>
                            )}
            </View>
        </Pressable>
    )
}

const IMAGE_SIZE = 70;

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
    },
    imageMusicSearch: {
        height: 55,
        width: 55,
        borderRadius: 5
    },
    imageArtistSearch: {
        height: 55,
        width: 55,
        borderRadius: 1000
    },
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    imagePlaylist1: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: 5,
        position: "absolute",
        backgroundColor: "#000",
        top: 0,
        left: 0,
        zIndex: 3,
    },
    imagePlaylist2: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: 5,
        position: "absolute",
        backgroundColor: "#000",
        top: -8,
        opacity: 0.6,
        transform: [{ scale: 0.88 }],
        zIndex: 2,
    },
    imagePlaylist3: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: 5,
        position: "absolute",
        backgroundColor: "#000",
        top: -16,
        opacity: 0.3,
        transform: [{ scale: 0.75 }],
        zIndex: 1,
    },
    containerImgPlaylists: {
        width: IMAGE_SIZE + 20,
        height: IMAGE_SIZE,
        position: "relative",
    }
});