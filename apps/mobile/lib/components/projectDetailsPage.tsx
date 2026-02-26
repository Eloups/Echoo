import { View, ScrollView, Image, Pressable, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import { Music, Project } from '@/lib/types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import DetailMusicCard from '@/lib/components/detailMusicCard';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { AlbumService, apiClient } from '@/lib/api';

const IMAGE_SIZE = 200;
const placeholderImage = require("../../assets/images/react-logo.png");

export default function ProjectDetailsPage() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();
    const [menuVisible, setMenuVisible] = useState(false);
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalDuration, setTotalDuration] = useState(0);

    const rawData = useMemo(() => {
        if (!params.data) return null;
        try {
            return JSON.parse(params.data as string) as Project & { id?: number };
        } catch (parseError) {
            if (__DEV__) {
                console.error('Erreur de parsing des params album:', parseError);
            }
            return null;
        }
    }, [params.data]);

    const projectId = useMemo(() => {
        const candidate = params.idProject ?? params.projectId ?? rawData?.id;
        const parsed = Number(candidate);
        return Number.isFinite(parsed) ? parsed : null;
    }, [params.idProject, params.projectId, rawData?.id]);

    const handleBack = () => {
        const from = params.from as string;
        if (from) {
            router.push(from as any);
        } else {
            router.push('/(tabs)/home');
        }
    };

    useEffect(() => {
        const albumName = rawData?.title || 'Album';
        navigation.setOptions({
            title: albumName,
        } as any);
    }, [navigation, rawData?.title]);

    useEffect(() => {
        let isMounted = true;

        const fetchProject = async () => {
            if (!projectId) {
                setProject(rawData as Project | null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const response = await AlbumService.getProjectById(projectId);
                const apiProject = response.project;
                

                const albumCover = apiProject.coverPath
                    ? { uri: apiClient.getImageUrl(apiProject.coverPath) }
                    : placeholderImage;

                const mappedMusics: Music[] = (apiProject.musics || []).map((music) => ({
                    id: music.id,
                    cover: albumCover,
                    title: music.title,
                    artist: apiProject.artistName || 'Artiste inconnu',
                    color1: apiProject.color1 || '#04131D',
                    color2: apiProject.color2 || '#082840',
                    nbStreams: music.nbStreams || 0,
                    audioFile: music.filePath,
                    duration: music.duration,
                }));

                const mappedProject: Project = {
                    cover: albumCover,
                    type: apiProject.projectType?.toLowerCase() || 'album',
                    title: apiProject.title,
                    description: rawData?.artist.toString() || '',
                    artist: apiProject.artistName,
                    musics: mappedMusics,
                };

                if (isMounted) {
                    setProject(mappedProject);
                    const total = (apiProject.musics || []).reduce((acc, music) => acc + (music.duration || 0), 0);
                    setTotalDuration(total);
                }
            } catch (fetchError) {
                if (__DEV__) {
                    console.error('Erreur lors du chargement du projet:', fetchError);
                }
                if (isMounted) {
                    setError('Impossible de charger cet album');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProject();

        return () => {
            isMounted = false;
        };
    }, [projectId, rawData]);

    if (loading && !project) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <AppText style={{ marginTop: 10 }}>Chargement de l'album...</AppText>
            </View>
        );
    }

    if (error && !project) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <AppText color="text2" style={{ textAlign: 'center' }}>{error}</AppText>
            </View>
        );
    }

    if (!project) {
        return null;
    }

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}min${secs.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Pressable
                    onPress={handleBack}
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
                                console.log('Partager');
                            }}
                        >
                            <MaterialIcons name="share" size={20} color={theme.colors.text} />
                            <AppText style={{ marginLeft: 12 }}>Partager</AppText>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: theme.colors.background, marginVertical: 4 }} />
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                console.log('Ajouter à une playlist');
                            }}
                        >
                            <MaterialIcons name="playlist-add" size={20} color={theme.colors.text} />
                            <AppText style={{ marginLeft: 12 }}>Ajouter à une playlist</AppText>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <View style={{ alignItems: 'center', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Image
                        source={project.cover}
                        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 5 }}
                    />
                    <AppText size="2xl" style={{ marginTop: 20, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 20 }}>
                        {project.title}
                    </AppText>
                    <AppText size="md" color="text2" style={{ marginTop: 5 }}>
                        {project.artist}
                    </AppText>
                    {project.musics && project.musics.length > 0 && (
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 10, width: '100%', justifyContent: 'space-between' }}>
                                <AppText size="sm" color="text">
                                    {project.musics.length} Morceaux
                                </AppText>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <AppText size="sm" color="text">{formatDuration(totalDuration)}</AppText>
                                    <Ionicons name="time-outline" size={14} color={theme.colors.text} />
                                </View>
                            </View>
                            <View style={{ width: '100%', height: 1, backgroundColor: theme.colors.text, marginTop: 5 }}></View>
                        </>
                    )}
                </View>

                <View style={{ paddingHorizontal: 20 }}>
                    {project.musics?.map((music, index) => (
                        <View key={index} style={{ marginBottom: 16 }}>
                            <DetailMusicCard
                                infos={music}
                                isAlbum={true}
                                queue={project.musics || []}
                                index={index}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dropdownMenu: {
        position: 'absolute',
        top: 45,
        right: 0,
        width: 180,
        borderRadius: 8,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1000,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
});