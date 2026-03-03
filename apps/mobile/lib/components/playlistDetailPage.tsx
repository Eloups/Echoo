import { View, ScrollView, Image, Pressable, StyleSheet, Modal, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import { Playlist, Music } from '../types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MusicCard from './musicCard';
import DetailMusicCard from './detailMusicCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { PlaylistService, apiClient, MusicService, ImageService } from '@/lib/api';
import { HomeService } from '@/lib/api/home.service';
import EditPlaylistModal from './editPlaylistModal';
import { LoadingSpinner } from './global/BtnConnexion';

const placeholderImage = require('../../assets/images/react-logo.png');

type PlaylistDetailPageProps = {
    data: Playlist;
    onBack: () => void;
};

export default function PlaylistDetailPage({ data, onBack }: PlaylistDetailPageProps) {
    const { theme } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [playlistDetails, setPlaylistDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [musicList, setMusicList] = useState<Music[]>([]);
    const [totalDuration, setTotalDuration] = useState(0);
    const [searchField, setSearchField] = useState('');
    const [searchMusics, setSearchMusics] = useState<Music[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [pendingToggleMusicIds, setPendingToggleMusicIds] = useState<number[]>([]);

    const fetchPlaylistDetails = async () => {
        if (!data.id) return;
        
        try {
            setLoading(true);
            const response: any = await PlaylistService.getPlaylistById(data.id);
            const playlistData = response.playlist || response;
            
            setPlaylistDetails(playlistData);
            
            // Convertir les musiques au format Music et récupérer les covers
            const formattedMusics: Music[] = await Promise.all(
                (playlistData.musics || []).map(async (music: any) => {
                    let coverUri = data.cover;
                    
                    try {
                        const coverData = await MusicService.getMusicCoverPath(music.id);
                        if (coverData.cover_path) {
                            coverUri = { uri: apiClient.getImageUrl(coverData.cover_path) };
                        }
                    } catch (error) {
                        console.error(`Erreur lors de la récupération de la cover pour la musique ${music.id}:`, error);
                    }
                    
                    return {
                        id: music.id,
                        cover: coverUri,
                        title: music.title,
                        artist: music.nameArtist || music.artist || "Artiste inconnu",
                        color1: "#04131D",
                        color2: "#082840",
                        nbStreams: music.nbStreams || 0,
                        type: "music" as const,
                        audioFile: music.filePath || music.fichierAudio || music.audioFile || `music_${music.id}.mp3`,
                        duration: music.duration || 0
                    };
                })
            );
            
            setMusicList(formattedMusics);
            
            // Calculer la durée totale
            const total = (playlistData.musics || []).reduce((acc: number, music: any) => acc + (music.duration || 0), 0);
            setTotalDuration(total);
        } catch (err) {
            console.error('Erreur lors du chargement de la playlist:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaylistDetails();
    }, [data.id]);

    useEffect(() => {
        if (!modalVisible) return;

        const trimmed = searchField.trim();

        if (trimmed.length === 0) {
            setSearchMusics([]);
            setSearchLoading(false);
            return;
        }

        if (trimmed.length < 3) {
            setSearchMusics([]);
            setSearchLoading(false);
            return;
        }

        setSearchLoading(true);

        const debounceTimer = setTimeout(async () => {
            try {
                const data = await HomeService.searchInDB(trimmed);

                const mappedMusics: Music[] = await Promise.all(
                    (data.musics || []).map(async (music: any) => {
                        let coverUri: any = placeholderImage;

                        try {
                            const coverData = await MusicService.getMusicCoverPath(music.id);
                            if (coverData?.cover_path) {
                                coverUri = { uri: apiClient.getImageUrl(coverData.cover_path) };
                            }
                        } catch (error) {
                            console.error(`Erreur cover musique ${music.id}:`, error);
                        }

                        return {
                            ...music,
                            artist: music.nameArtist ?? music.artist ?? "Artiste inconnu",
                            cover: coverUri,
                            color1: "#04131D",
                            color2: "#082840",
                            audioFile: music.filePath,
                            duration: music.duration || 0,
                        } as Music;
                    })
                );

                setSearchMusics(mappedMusics);
            } catch (error: any) {
                if (error?.response?.status !== 400) {
                    console.error('Erreur recherche musiques :', error);
                }
                setSearchMusics([]);
            } finally {
                setSearchLoading(false);
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchField, modalVisible]);

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}min${secs.toString().padStart(2, '0')}`;
    };

    const handleEditPlaylist = async (title: string, description: string, coverBase64: string | null, isPublic: boolean) => {
        try {
            if (!data.id) return;

            let coverPath = playlistDetails?.coverPath || "";
            
            // Si une nouvelle image a été sélectionnée, l'uploader
            if (coverBase64) {
                try {
                    const uploadResult = await ImageService.AddImage(coverBase64, 'image/jpeg');
                    coverPath = uploadResult.filename;
                } catch (uploadError) {
                    console.error('Erreur lors de l\'upload de l\'image:', uploadError);
                    Alert.alert("Avertissement", "L'image n'a pas pu être uploadée");
                }
            }

            // Mettre à jour la playlist
            await PlaylistService.updatePlaylist(data.id, {
                title,
                description,
                cover_path: coverPath,
                isPublic
            });
            setEditModalVisible(false);
            
            // Recharger les détails de la playlist
            const response: any = await PlaylistService.getPlaylistById(data.id);
            const playlistData = response.playlist || response;
            setPlaylistDetails(playlistData);
        } catch (err) {
            console.error('Erreur lors de la modification de la playlist:', err);
            Alert.alert("Erreur", "Impossible de modifier la playlist");
        }
    };

    const handleDeletePlaylist = async () => {
        Alert.alert(
            "Supprimer la playlist",
            "Êtes-vous sûr de vouloir supprimer cette playlist ? Cette action est irréversible.",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            if (!data.id) return;
                            
                            await PlaylistService.deletePlaylist(data.id);
                            onBack();
                        } catch (err) {
                            console.error('Erreur lors de la suppression de la playlist:', err);
                            Alert.alert("Erreur", "Impossible de supprimer la playlist");
                        }
                    }
                }
            ]
        );
    };

    const handleToggleMusicInPlaylist = async (music: Music, isInPlaylist: boolean) => {
        if (!data.id) return;

        try {
            setPendingToggleMusicIds((prev) => prev.includes(music.id) ? prev : [...prev, music.id]);

            if (isInPlaylist) {
                await PlaylistService.deleteMusicFromPlaylist(data.id, music.id);
            } else {
                await PlaylistService.addMusicToPlaylist(data.id, music.id);
            }

            await fetchPlaylistDetails();
        } catch (err) {
            console.error('Erreur lors de la mise à jour de la playlist:', err);
            Alert.alert('Erreur', 'Impossible de mettre à jour la playlist');
        } finally {
            setPendingToggleMusicIds((prev) => prev.filter((id) => id !== music.id));
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Pressable
                    onPress={onBack}
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 20,
                        zIndex: 10,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={32} color={theme.colors.text} />
                </Pressable>

                <View style={{ position: 'absolute', top: 10, right: 20, zIndex: 10 }}>
                    <Pressable
                        onPress={() => setMenuVisible(!menuVisible)}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <MaterialIcons name="more-vert" size={28} color={theme.colors.text} />
                    </Pressable>

                    {menuVisible && (
                        <View style={[
                            styles.dropdownMenu,
                            { backgroundColor: theme.colors.background2 }
                        ]}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => {
                                    setMenuVisible(false);
                                    setEditModalVisible(true);
                                }}
                            >
                                <MaterialIcons name="edit" size={20} color={theme.colors.text} />
                                <AppText style={{ marginLeft: 12 }}>Modifier</AppText>
                            </TouchableOpacity>
                            <View style={{ height: 1, backgroundColor: theme.colors.background, marginVertical: 4 }} />
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => {
                                    setMenuVisible(false);
                                    handleDeletePlaylist();
                                }}
                            >
                                <MaterialIcons name="delete" size={20} color="#ff4444" />
                                <AppText style={{ marginLeft: 12, color: '#ff4444' }}>Supprimer</AppText>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {menuVisible && (
                    <Pressable
                        style={styles.menuOverlay}
                        onPress={() => setMenuVisible(false)}
                    />
                )}

                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <LoadingSpinner size={20} color={theme.colors.primary} />
                        <AppText style={{ marginTop: 10 }}>Chargement de la playlist...</AppText>
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
                        {/* En-tête avec image et infos */}
                        <View style={{ alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 }}>
                            <View style={styles.containerImgPlaylists}>
                                <Image
                                    source={playlistDetails?.coverPath 
                                        ? { uri: apiClient.getImageUrl(playlistDetails.coverPath) }
                                        : data.cover}
                                    style={styles.imagePlaylist1}
                                />
                                <Image
                                    source={playlistDetails?.coverPath 
                                        ? { uri: apiClient.getImageUrl(playlistDetails.coverPath) }
                                        : data.cover}
                                    style={styles.imagePlaylist2}
                                />
                                <Image
                                    source={playlistDetails?.coverPath 
                                        ? { uri: apiClient.getImageUrl(playlistDetails.coverPath) }
                                        : data.cover}
                                    style={styles.imagePlaylist3}
                                />
                            </View>
                            <AppText size="2xl" style={{ marginTop: 30, textAlign: 'center', fontWeight: 'bold' }}>
                                {playlistDetails?.title || data.title}
                            </AppText>
                            <AppText size="sm" color="text2" style={{ marginTop: 8, textAlign: 'center' }}>
                                {playlistDetails?.description || data.description}
                            </AppText>
                            
                            {/* Nombre de morceaux et durée */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 10, width: '100%', justifyContent: 'space-between' }}>
                                <AppText size="sm" color="text">
                                    {musicList.length} Morceaux
                                </AppText>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <AppText size="sm" color="text">{formatDuration(totalDuration)}</AppText>
                                    <Ionicons name="time-outline" size={14} color={theme.colors.text} />
                                </View>
                            </View>
                            <View style={{width: '100%', height: 1, backgroundColor: theme.colors.text, marginTop: 5}}></View>
                        </View>

                        {/* Liste des musiques */}
                        {musicList.length > 0 && (
                            <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
                                {musicList.map((music, index) => (
                                    <View key={music.id || index} style={{ marginBottom: 9 }}>
                                        <DetailMusicCard 
                                            infos={music} 
                                            onRemove={() => fetchPlaylistDetails()}
                                            queue={musicList}
                                            index={index}
                                            fromPlaylistId={data.id}
                                        />
                                    </View>
                                ))}
                            </View>
                        )}
                    </ScrollView>
                )}

                {/* Bouton pour ajouter des musiques à la playlist */}
                <Pressable
                    onPress={() => {
                        setSearchField('');
                        setSearchMusics([]);
                        setModalVisible(true);
                    }}
                    style={{
                        position: 'absolute',
                        bottom: 90,
                        right: 20,
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: theme.colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84
                    }}
                >
                    <MaterialIcons name="add" size={30} color="#fff" />
                </Pressable>

                {/* Modale ajout de musiques */}
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    presentationStyle="pageSheet"
                >
                    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                        <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
                            <View style={styles.modalHeader}>
                                <View style={[styles.searchInputContainer, { borderColor: theme.colors.primary }]}> 
                                    <TextInput
                                        style={[styles.searchInput, { color: theme.colors.text }]}
                                        placeholder="Rechercher une musique"
                                        placeholderTextColor={theme.colors.text2}
                                        value={searchField}
                                        onChangeText={setSearchField}
                                    />
                                    <Feather name="search" size={20} color={theme.colors.text} />
                                </View>
                                <Pressable
                                    onPress={() => setModalVisible(false)}
                                    style={{ padding: 10 }}
                                >
                                    <MaterialIcons name="close" size={24} color={theme.colors.text} />
                                </Pressable>
                            </View>

                            <View style={{ flex: 1, marginTop: 12 }}>
                                {searchLoading ? (
                                    <View style={styles.centeredState}>
                                        <LoadingSpinner size={20} color={theme.colors.primary} />
                                    </View>
                                ) : searchField.trim().length < 3 ? (
                                    <View style={styles.centeredState}>
                                        <AppText color="text2">Tape au moins 3 caractères</AppText>
                                    </View>
                                ) : searchMusics.length === 0 ? (
                                    <View style={styles.centeredState}>
                                        <AppText color="text2">Aucune musique trouvée</AppText>
                                    </View>
                                ) : (
                                    <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 20 }}>
                                        {searchMusics.map((music, index) => (
                                            <MusicCard
                                                key={`search-music-${music.id || index}`}
                                                infos={music}
                                                isSearch={true}
                                                isHome={true}
                                                variant="playlistToggle"
                                                isInPlaylist={musicList.some((item) => item.id === music.id)}
                                                onTogglePlaylist={handleToggleMusicInPlaylist}
                                                isToggleLoading={pendingToggleMusicIds.includes(music.id)}
                                            />
                                        ))}
                                    </ScrollView>
                                )}
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>

                {/* Modale d'édition de playlist */}
                <EditPlaylistModal
                    visible={editModalVisible}
                    onClose={() => setEditModalVisible(false)}
                    onSubmit={handleEditPlaylist}
                    initialData={{
                        title: playlistDetails?.title || data.title,
                        description: playlistDetails?.description || data.description || "",
                        coverUri: playlistDetails?.coverPath 
                            ? apiClient.getImageUrl(playlistDetails.coverPath)
                            : undefined,
                        isPublic: playlistDetails?.isPublic || false
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
    imagePlaylist1: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: 5,
        position: "absolute",
        backgroundColor: "#000",
        top: 0,
        left: 10,
        zIndex: 3,
    },
    imagePlaylist2: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: 5,
        position: "absolute",
        backgroundColor: "#000",
        top: -20,
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
        top: -40,
        opacity: 0.3,
        transform: [{ scale: 0.75 }],
        zIndex: 1,
    },
    containerImgPlaylists: {
        width: IMAGE_SIZE + 20,
        height: IMAGE_SIZE,
        position: "relative",
        alignItems: "center",
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    searchInputContainer: {
        flex: 1,
        height: 44,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchInput: {
        flex: 1,
        marginRight: 8,
    },
    centeredState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 45,
        right: 0,
        minWidth: 180,
        borderRadius: 8,
        padding: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    menuOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 5,
    },
});