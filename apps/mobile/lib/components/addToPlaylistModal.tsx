import { View, Modal, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PlaylistService } from '@/lib/api';
import { LoadingSpinner } from './global/BtnConnexion';
import useAuthHook from '@/hook/authHook';

type AddToPlaylistModalProps = {
    visible: boolean;
    onClose: () => void;
    musicId: number;
    onSuccess?: () => void;
};

type PlaylistItem = {
    id: number;
    title: string;
    coverPath?: string;
};

export default function AddToPlaylistModal({ visible, onClose, musicId, onSuccess }: AddToPlaylistModalProps) {
    const { theme } = useTheme();
    const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
    const [selectedPlaylists, setSelectedPlaylists] = useState<Set<number>>(new Set());
    const [initialSelectedPlaylists, setInitialSelectedPlaylists] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    let { userId } = useAuthHook();
    if (!userId) {
        userId = "";
    }

    useEffect(() => {
        if (visible) {
            fetchPlaylists();
        }
    }, [visible, musicId]);

    const fetchPlaylists = async () => {
        try {
            setLoading(true);
            setSelectedPlaylists(new Set());

            const response: any = await PlaylistService.getAllPlaylistsByUserID(userId);

            // Extraire les playlists selon la structure de la réponse
            const playlistsData = response.playlists || response || [];
            
            const mappedPlaylists = playlistsData.map((p: any) => ({
                id: p.id,
                title: p.title,
                coverPath: p.coverPath
            }));

            const playlistDetailsResults = await Promise.allSettled(
                mappedPlaylists.map((playlist) => PlaylistService.getPlaylistById(playlist.id))
            );

            const preSelected = new Set<number>();

            playlistDetailsResults.forEach((result, index) => {
                if (result.status !== 'fulfilled') return;

                const payload: any = result.value;
                const playlistDetail = payload?.playlist || payload;
                const musics = playlistDetail?.musics || [];

                if (Array.isArray(musics) && musics.some((music: any) => music?.id === musicId)) {
                    preSelected.add(mappedPlaylists[index].id);
                }
            });

            setPlaylists(mappedPlaylists);
            setSelectedPlaylists(preSelected);
            setInitialSelectedPlaylists(new Set(preSelected));
        } catch (err) {
            console.error('Erreur lors du chargement des playlists:', err);
            Alert.alert("Erreur", "Impossible de charger les playlists");
        } finally {
            setLoading(false);
        }
    };

    const togglePlaylist = (playlistId: number) => {
        const newSelected = new Set(selectedPlaylists);
        if (newSelected.has(playlistId)) {
            newSelected.delete(playlistId);
        } else {
            newSelected.add(playlistId);
        }
        setSelectedPlaylists(newSelected);
    };

    const handleSubmit = async () => {
        const toAdd = Array.from(selectedPlaylists).filter((playlistId) => !initialSelectedPlaylists.has(playlistId));
        const toRemove = Array.from(initialSelectedPlaylists).filter((playlistId) => !selectedPlaylists.has(playlistId));

        if (toAdd.length === 0 && toRemove.length === 0) {
            onClose();
            return;
        }

        try {
            setSubmitting(true);
            
            const addPromises = toAdd.map((playlistId) =>
                PlaylistService.addMusicToPlaylist(playlistId, musicId)
            );

            const removePromises = toRemove.map((playlistId) =>
                PlaylistService.deleteMusicFromPlaylist(playlistId, musicId)
            );
            
            await Promise.all([...addPromises, ...removePromises]);
            
            onSuccess?.();
            onClose();
        } catch (err) {
            console.error('Erreur lors de l\'ajout aux playlists:', err);
            Alert.alert("Erreur", "Impossible de mettre à jour les playlists");
        } finally {
            setSubmitting(false);
        }
    };

    const hasChanges = Array.from(selectedPlaylists).some((id) => !initialSelectedPlaylists.has(id))
        || Array.from(initialSelectedPlaylists).some((id) => !selectedPlaylists.has(id));

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}
            presentationStyle="pageSheet"
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <AppText size="xl" style={{ flex: 1 }}>Ajouter ou retirer des playlists</AppText>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={24} color={theme.colors.text} />
                        </Pressable>
                    </View>

                    {/* Liste des playlists */}
                    {loading ? (
                        <View style={styles.centerContainer}>
                            <LoadingSpinner size={20} color={theme.colors.primary} />
                            <AppText style={{ marginTop: 10 }}>Chargement des playlists...</AppText>
                        </View>
                    ) : playlists.length === 0 ? (
                        <View style={styles.centerContainer}>
                            <MaterialIcons name="playlist-add" size={64} color={theme.colors.text2} />
                            <AppText style={{ marginTop: 16 }} color="text2">Aucune playlist disponible</AppText>
                        </View>
                    ) : (
                        <>
                            <ScrollView style={styles.scrollView}>
                                {playlists.map((playlist) => (
                                    <Pressable
                                        key={playlist.id}
                                        style={[
                                            styles.playlistItem,
                                            { backgroundColor: theme.colors.background2 }
                                        ]}
                                        onPress={() => togglePlaylist(playlist.id)}
                                    >
                                        <View style={styles.playlistInfo}>
                                            <MaterialIcons
                                                name="queue-music"
                                                size={24}
                                                color={theme.colors.text2}
                                            />
                                            <AppText size="md" style={{ marginLeft: 12, flex: 1 }}>
                                                {playlist.title}
                                            </AppText>
                                        </View>
                                        <View style={[
                                            styles.checkbox,
                                            { borderColor: theme.colors.primary },
                                            selectedPlaylists.has(playlist.id) && {
                                                backgroundColor: theme.colors.primary
                                            }
                                        ]}>
                                            {selectedPlaylists.has(playlist.id) && (
                                                <MaterialIcons name="check" size={18} color="#fff" />
                                            )}
                                        </View>
                                    </Pressable>
                                ))}
                            </ScrollView>

                            {/* Bouton Ajouter */}
                            <View style={styles.footer}>
                                <Pressable
                                    style={[
                                        styles.submitButton,
                                        { backgroundColor: theme.colors.primary },
                                        (submitting || !hasChanges) && styles.submitButtonDisabled
                                    ]}
                                    onPress={handleSubmit}
                                    disabled={submitting || !hasChanges}
                                >
                                    {submitting ? (
                                        <LoadingSpinner size={20} color={theme.colors.primary} />
                                    ) : (
                                        <AppText size="md" style={{ color: '#fff', fontWeight: '600' }}>
                                            Valider
                                        </AppText>
                                    )}
                                </Pressable>
                            </View>
                        </>
                    )}
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    closeButton: {
        padding: 8,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    playlistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    playlistInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    submitButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
});
