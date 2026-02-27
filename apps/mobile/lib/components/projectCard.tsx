import { View, Image, StyleSheet, Pressable } from "react-native";
import { Project } from "../types/types";
import AppText from "./global/appText";
import { router, useLocalSearchParams, useSegments } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from "../theme/provider";

type ProjectCardProps = {
    infos: Project & { id?: number },
    isSearch?: boolean,
    isHome?: boolean,
    isArtistPage?: boolean,
    fromPath?: string,
    fromParams?: string,
}

// Composant dédié à l'affichage des projets (albums, EP, singles)
export default function ProjectCard(props: ProjectCardProps) {
    const { theme } = useTheme();
    const segments = useSegments();
    const localParams = useLocalSearchParams();
    const isSearch = props.isSearch ?? false;
    const isHome = props.isHome ?? false;
    const isArtistPage = props.isArtistPage ?? false;

    const handlePress = () => {
        const currentPath = props.fromPath || ('/' + segments.join('/'));
        const fromParams = props.fromParams || JSON.stringify(localParams);
        
        router.push({
            pathname: "/(tabs)/detail",
            params: {
                data: JSON.stringify(props.infos),
                from: currentPath,
                fromParams,
                detailType: 'project',
                idProject: props.infos.id,
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

    const getArtistPageMeta = () => {
        const year =
            (props.infos as any)?.year ??
            (props.infos as any)?.releaseYear ??
            (props.infos as any)?.release_date?.toString?.().slice(0, 4) ??
            null;

        const artist = formatArtist(props.infos.artist, 36);
        return year ? `${year} • ${artist}` : artist;
    };

    return (
        <Pressable onPress={handlePress}>
            <View>
                {isArtistPage ? (
                    // Variante dédiée à la page artiste
                    <View style={styles.artistPageContainer}>
                        <View style={styles.artistPageLeftContent}>
                            <Image source={props.infos.cover} height={83} width={83} style={styles.imageArtistPage}></Image>
                            <View style={styles.artistPageTextWrapper}>
                                <AppText size={"lg"} style={styles.artistPageTitle}>
                                    {props.infos.title.length > 34 ? props.infos.title.slice(0, 34) + "..." : props.infos.title}
                                </AppText>
                                <AppText size={"sm"} color="text2" style={styles.artistPageSubtitle}>
                                    {getArtistPageMeta()}
                                </AppText>
                            </View>
                        </View>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={32}
                            color={theme.colors.text}
                            style={styles.artistPageChevron}
                        />
                    </View>
                ) : isSearch ? (
                    // Pour la recherche dans la page Découvrir
                    <View style={styles.searchContainer}>
                        <Image source={props.infos.cover} height={55} width={55} style={styles.imageSearch}></Image>
                        <View>
                            <AppText size={"md"} style={{ marginTop: 3 }}>
                                {props.infos.title.length > 40 ? props.infos.title.slice(0, 40) + "..." : props.infos.title}
                            </AppText>
                            <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>
                                {getProjectTypeLabel()} • {formatArtist(props.infos.artist, 40)}
                            </AppText>
                        </View>
                    </View>
                ) : isHome ? (
                    // Vue compacte pour la page d'accueil
                    <View>
                        <Image source={props.infos.cover} height={95} width={95} style={styles.imageProject}></Image>
                        <AppText size={"md"} style={{ marginTop: 3 }}>
                            {props.infos.title.length > 15 ? props.infos.title.slice(0, 13) + "..." : props.infos.title}
                        </AppText>
                        <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>
                            {getProjectTypeLabel()}
                        </AppText>
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
                                {formatArtist(props.infos.artist, 50)}
                            </AppText>
                        </View>
                    </View>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    imageProject: {
        height: 95,
        width: 95,
        borderRadius: 5
    },
    imageSearch: {
        height: 55,
        width: 55,
        borderRadius: 5
    },
    imageArtistPage: {
        height: 83,
        width: 83,
        borderRadius: 5
    },
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    artistPageContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingRight: 8,
    },
    artistPageLeftContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    artistPageTextWrapper: {
        flex: 1,
    },
    artistPageTitle: {
        lineHeight: 24,
    },
    artistPageSubtitle: {
        marginTop: -2,
        lineHeight: 18,
    },
    artistPageChevron: {
        marginLeft: 8,
        transform: [{ rotate: '180deg' }],
    },
});
