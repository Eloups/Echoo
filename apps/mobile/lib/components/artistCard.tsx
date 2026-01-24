import { View, Image, StyleSheet, Pressable } from "react-native";
import { BaseInfos } from "../types/types";
import AppText from "./global/appText";
import { router, useSegments } from "expo-router";

type ArtistCardProps = {
    infos: BaseInfos,
    isSearch: boolean,
    isHome?: boolean
}

// Composant dédié à l'affichage d'un artiste
export default function ArtistCard(props: ArtistCardProps) {
    const segments = useSegments();

    props.isHome ?? false;

    const handlePress = () => {
        // Construire le chemin actuel
        const currentPath = '/' + segments.join('/');
        
        router.push({
            pathname: "/(tabs)/artist/presentation",
            params: {
                title: props.infos.title,
                data: JSON.stringify(props.infos),
                from: currentPath
            }
        });
    };

    return (
        <Pressable onPress={handlePress}>
            <View>
                {props.isSearch === false && props.isHome === true ? (
                    <View>
                        <Image source={props.infos.cover} height={95} width={95} style={styles.imageArtist}></Image>
                        <AppText size={"md"} style={{ marginTop: 3 }}>{props.infos.title.length > 15 ? props.infos.title.slice(0, 13) + "..." : props.infos.title}</AppText>
                    </View>
                ) : (
                    // Pour la recherche dans la page Découvrir
                    <View style={styles.searchContainer}>
                        <Image source={props.infos.cover} height={55} width={55} style={styles.imageArtistSearch}></Image>
                        <View>
                            <AppText size={"md"} style={{ marginTop: 3 }}>{props.infos.title.length > 40 ? props.infos.title.slice(0, 40) + "..." : props.infos.title}</AppText>
                        </View>
                    </View>
                )}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    imageArtist: {
        height: 95,
        width: 95,
        borderRadius: 1000
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
    }
});
