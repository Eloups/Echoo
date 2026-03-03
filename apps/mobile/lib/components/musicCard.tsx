import { View, Image, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Music } from "../types/types";
import AppText from "./global/appText";
import { useTheme } from "../theme/provider";
import usePlayerStore from "@/hook/usePlayerStore";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddToPlaylistModal from './addToPlaylistModal';
import { MusicService } from "../api";
import { UserService } from "../api/user.service";

type PageProps = {
    infos: Music,
    isSearch: boolean,
    isHome?: boolean
}

// Permet d'afficher une musique
export default function MusicCard(props: PageProps) {
    const { theme } = useTheme();
    const { playTrack, addToQueue, playNext } = usePlayerStore();
    const [menuVisible, setMenuVisible] = useState(false);
    const [addToPlaylistModalVisible, setAddToPlaylistModalVisible] = useState(false);
    const [isMusicLike, setIsMusicLike] = useState<boolean>(false);
    const userId = "3";

    props.isHome ?? false;

    useEffect(() => {
        if (props.infos !== null) {
            MusicService.getIsMusicIsLike(userId, props.infos.id)
                .then(setIsMusicLike);
        }
    }, [props.infos]);

    const handlePress = () => {
        const fileName = props.infos.audioFile;
        if (!fileName) return;
        playTrack(props.infos, fileName);
    };

    const handleMusicLike = () => {
        setIsMusicLike(!isMusicLike);
        UserService.postLikeMusic(userId, props.infos.id);
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={handlePress}
                unstable_pressDelay={120}
                style={({ pressed }) => [
                    styles.pressableContainer,
                    props.isSearch && styles.searchPressable,
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

            {props.isSearch && (
                <View style={styles.rightSection}>
                    <Pressable
                        style={styles.menuButton}
                        onPress={() => setMenuVisible(!menuVisible)}
                    >
                        <MaterialIcons name="more-horiz" size={24} color={theme.colors.text} />
                    </Pressable>
                </View>
            )}

            {props.isSearch && menuVisible && (
                <>
                    <Pressable
                        style={styles.menuOverlay}
                        onPress={() => setMenuVisible(false)}
                    />
                    <View style={[
                        styles.dropdownMenu,
                        { backgroundColor: theme.colors.background2 }
                    ]}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                playNext(props.infos);
                            }}
                        >
                            <MaterialIcons name="play-arrow" size={20} color={theme.colors.text} />
                            <AppText style={{ marginLeft: 12 }} pointerEvents="none">Lire ensuite</AppText>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: theme.colors.background, marginVertical: 4 }} />
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                addToQueue(props.infos);
                            }}
                        >
                            <MaterialIcons name="queue-music" size={20} color={theme.colors.text} />
                            <AppText style={{ marginLeft: 12 }} pointerEvents="none">Ajouter à la file d'attente</AppText>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: theme.colors.background, marginVertical: 4 }} />
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                setAddToPlaylistModalVisible(true);
                            }}
                        >
                            <MaterialIcons name="playlist-add" size={20} color={theme.colors.text} />
                            <AppText style={{ marginLeft: 12 }} pointerEvents="none">Ajouter à une playlist</AppText>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: theme.colors.background, marginVertical: 4 }} />
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                handleMusicLike();
                            }}
                        >
                            <Ionicons name={isMusicLike ? "heart" : "heart-outline"} size={26} color={isMusicLike ? '#DB1151' : theme.colors.text} />
                            <AppText style={{ marginLeft: 12 }} pointerEvents="none">{!isMusicLike ? "Liker cette musique" : "Retirer le like"}</AppText>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <AddToPlaylistModal
                visible={addToPlaylistModalVisible}
                onClose={() => setAddToPlaylistModalVisible(false)}
                musicId={props.infos.id}
                onSuccess={() => {
                    console.log('Musique ajoutée aux playlists avec succès');
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    pressableContainer: {
        borderRadius: 8,
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    searchPressable: {
        paddingRight: 44,
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
    },
    rightSection: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingRight: 15
    },
    menuButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 44,
        right: 4,
        minWidth: 200,
        borderRadius: 8,
        padding: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 1000,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    menuOverlay: {
        position: 'absolute',
        top: -1000,
        left: -1000,
        right: -1000,
        bottom: -1000,
        zIndex: 998,
    }
});