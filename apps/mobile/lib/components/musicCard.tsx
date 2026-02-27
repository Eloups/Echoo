import { View, Image, StyleSheet, Pressable } from "react-native";
import { Music } from "../types/types";
import AppText from "./global/appText";
import { isSearchBarAvailableForCurrentPlatform, SearchBar } from "react-native-screens";
import { themes } from "../theme";
import { useTheme } from "../theme/provider";
import { cloneElement } from "react";
import { router, useSegments } from "expo-router";
import usePlayerStore from "@/hook/usePlayerStore";

type PageProps = {
    infos: Music,
    isSearch: boolean,
    isHome?: boolean
}

// Permet d'afficher une musique
export default function MusicCard(props: PageProps) {
    const { theme, toggleTheme } = useTheme();
    const segments = useSegments();
    const { playTrack } = usePlayerStore();

    props.isHome ?? false;

    const handlePress = () => {
        const fileName = props.infos.audioFile;
        if (!fileName) return;
        playTrack(props.infos, fileName);
    };

    return (
        <Pressable
            onPress={handlePress}
            unstable_pressDelay={120}
            style={({ pressed }) => [
                styles.pressableContainer,
                pressed && { backgroundColor: theme.colors.background2 }
            ]}
        >
            <View>
                {props.isSearch === false && props.isHome === true ? (
                    <View>
                        <Image source={props.infos.cover} height={95} width={95} style={styles.imageMusic}></Image>
                        <AppText size={"md"} style={{ marginTop: 3 }}>{props.infos.title.length > 15 ? props.infos.title.slice(0, 13) + "..." : props.infos.title}</AppText>
                        <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>{props.infos.artist.length > 16 ? props.infos.artist.slice(0, 15) + "..." : props.infos.artist}</AppText>
                    </View>
                ) : (
                    // Pour la recherche dans la page Découvrir
                    <View style={styles.searchContainer}>
                        <Image source={props.infos.cover} height={55} width={55} style={styles.imageMusicSearch}></Image>
                        <View>
                            <AppText size={"md"} style={{ marginTop: 3 }}>{props.infos.title.length > 40 ? props.infos.title.slice(0, 40) + "..." : props.infos.title}</AppText>
                            <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>Morceau • {props.infos.artist.length > 40 ? props.infos.artist.slice(0, 40) + "..." : props.infos.artist}</AppText>
                        </View>
                    </View>
                )}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressableContainer: {
        borderRadius: 8,
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    imageMusic: {
        height: 95,
        width: 95,
        borderRadius: 5
    },
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