import { View, Image, StyleSheet, Pressable } from "react-native";
import { Project } from "../types/types";
import AppText from "./global/appText";
import { router, useSegments } from "expo-router";

type ProjectCardProps = {
    infos: Project,
    isSearch?: boolean
}

// Composant dédié à l'affichage des projets (albums, EP, singles)
export default function ProjectCard(props: ProjectCardProps) {
    const segments = useSegments();
    const isSearch = props.isSearch ?? false;

    const handlePress = () => {
        const currentPath = '/' + segments.join('/');
        
        router.push({
            pathname: "/(tabs)/album/musiques",
            params: {
                data: JSON.stringify(props.infos),
                from: currentPath
            }
        });
    };

    const IMAGE_SIZE = 70;

    const getProjectTypeLabel = () => {
        switch (props.infos.type) {
            case "album":
                return "Album";
            case "ep":
                return "EP";
            case "single":
                return "Single";
            default:
                return props.infos.type;
        }
    };

    const formatArtist = (artist: string[] | string, maxLength: number = 40) => {
        const artistString = Array.isArray(artist) ? artist.join(", ") : artist;
        return artistString.length > maxLength 
            ? artistString.slice(0, maxLength - 3) + "..." 
            : artistString;
    };

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
                                {getProjectTypeLabel()} • {formatArtist(props.infos.artist, 40)}
                            </AppText>
                        </View>
                    </View>
                ) : (
                    // Vue normale
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <View style={{
                            width: IMAGE_SIZE + 20,
                            height: IMAGE_SIZE,
                            position: "relative" as const,
                        }}>
                            <Image source={props.infos.cover} height={95} width={95} style={{
                                width: IMAGE_SIZE,
                                height: IMAGE_SIZE,
                                borderRadius: 5,
                                backgroundColor: "#000",
                            }}></Image>
                        </View>
                        <View style={{ display: "flex", flexDirection: "column" }}>
                            <AppText size={"lg"}>
                                {props.infos.title.length > 36 ? props.infos.title.slice(0, 34) + "..." : props.infos.title}
                            </AppText>
                            <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>
                                {formatArtist(props.infos.artist, 16)}
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
