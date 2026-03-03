import { View, Image, StyleSheet, Pressable, TouchableOpacity, Dimensions } from "react-native";
import { useState, useRef, useEffect } from "react";
import { Music } from "../types/types";
import AppText from '@/lib/components/global/appText';
import { useTheme } from "../theme/provider";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import usePlayerStore from "@/hook/usePlayerStore";
import AddToPlaylistModal from './addToPlaylistModal';
import { MusicService, PlaylistService } from "../api";
import { UserService } from "../api/user.service";

type DetailMusicCardProps = {
    infos: Music;
    onRemove?: () => void;
    isAlbum?: boolean;
    queue?: Music[];
    index?: number;
    fromPlaylistId?: number;
}

export default function DetailMusicCard({ infos, onRemove, isAlbum = false, queue = [], index = 0, fromPlaylistId = 0 }: DetailMusicCardProps) {
    const { theme } = useTheme();
    const { playTrack, addToQueue, playNext } = usePlayerStore();
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState<'below' | 'above'>('below');
    const [addToPlaylistModalVisible, setAddToPlaylistModalVisible] = useState(false);
    const buttonRef = useRef<View>(null);
    const [isMusicLike, setIsMusicLike] = useState<boolean>(false);
    const userId = "3";
    
    const MENU_HEIGHT = 300; // Hauteur approximative du menu
    const NAV_BAR_HEIGHT = 60; // Hauteur de la barre de navigation
    const screenHeight = Dimensions.get('window').height;

    //Vérifie si la musique est déjà likée par un utilisateur
      useEffect(() => {
        if (infos !== null) {
          MusicService.getIsMusicIsLike(userId, infos.id)
          .then(setIsMusicLike);
        }
        
      }, [infos])
      
    const handleMenuPress = () => {
        if (!menuVisible) {
            buttonRef.current?.measureInWindow((x, y) => {
                const spaceBelow = screenHeight - y - 40 - NAV_BAR_HEIGHT;
                if (spaceBelow < MENU_HEIGHT) {
                    setMenuPosition('above');
                } else {
                    setMenuPosition('below');
                }
                setMenuVisible(true);
            });
        } else {
            setMenuVisible(false);
        }
    };

    const handlePlayMusic = () => {
        // Si une queue est fournie, on l'utilise, sinon on joue juste cette musique
        const fileName = infos.audioFile || 'default.mp3';
        playTrack(infos, fileName, queue.length > 0 ? queue : [infos], index);
    };

    const deleteFromPlaylist = async(playlistId: number, musicId: number) => {
        await PlaylistService.deleteMusicFromPlaylist(musicId, playlistId)
        if (onRemove) onRemove();
    }

    // Like d'une musique
  const handleMusicLike = () => {
    setIsMusicLike(!isMusicLike);
    UserService.postLikeMusic(userId, infos.id);
  }

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [
                    styles.leftSection,
                    pressed && { backgroundColor: theme.colors.background2 }
                ]}
                unstable_pressDelay={120}
                onPress={handlePlayMusic}
            >
                <Image
                    source={infos.cover}
                    style={styles.coverImage}
                />
                <View style={styles.infoSection}>
                    <AppText size="md" numberOfLines={1} pointerEvents="none">{infos.title}</AppText>
                    <AppText size="sm" color="text2" numberOfLines={1} pointerEvents="none">
                        {Array.isArray(infos.artist) ? infos.artist.join(', ') : infos.artist}
                    </AppText>
                </View>
            </Pressable>

            <View style={styles.rightSection} ref={buttonRef}>
                {/* Bouton menu hamburger */}
                <Pressable
                    style={styles.menuButton}
                    onPress={handleMenuPress}
                >
                    <MaterialIcons name="more-horiz" size={24} color={theme.colors.text} />
                </Pressable>

            </View>

            {/* Menu dropdown et overlay en dehors de rightSection */}
            {menuVisible && (
                <>
                    <Pressable
                        style={styles.menuOverlay}
                        onPress={() => setMenuVisible(false)}
                    />
                    <View style={[
                        styles.dropdownMenu,
                        { backgroundColor: theme.colors.background2 },
                        menuPosition === 'above' ? styles.dropdownMenuAbove : styles.dropdownMenuBelow
                    ]}>
                        {!isAlbum && (
                            <>
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => {
                                        setMenuVisible(false);
                                        deleteFromPlaylist(infos.id, fromPlaylistId);
                                    }}
                                >
                                    <MaterialIcons name="playlist-remove" size={20} color="#ff4444" />
                                    <AppText style={{ marginLeft: 12, color: '#ff4444' }} pointerEvents="none">Supprimer de la playlist</AppText>
                                </TouchableOpacity>
                                <View style={{ height: 1, backgroundColor: theme.colors.background, marginVertical: 4 }} />
                            </>
                        )}
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                playNext(infos);
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
                                addToQueue(infos);
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

            {/* Modale pour ajouter à une playlist */}
            <AddToPlaylistModal
                visible={addToPlaylistModalVisible}
                onClose={() => setAddToPlaylistModalVisible(false)}
                musicId={infos.id}
                onSuccess={() => {
                    console.log('Musique ajoutée aux playlists avec succès');
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    leftSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 6,
    },
    coverImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    infoSection: {
        flex: 1,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        position: 'relative',
    },
    menuButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownMenu: {
        position: 'absolute',
        right: 5,
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
    dropdownMenuBelow: {
        top: 50,
    },
    dropdownMenuAbove: {
        bottom: 50,
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
    },
});
