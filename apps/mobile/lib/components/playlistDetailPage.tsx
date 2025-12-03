import { View, ScrollView, Image, Pressable, SafeAreaView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/appText';
import { BaseInfos } from '../types/baseInfos';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MusicCard from './musicCard';
import DetailMusicCard from './detailMusicCard';
import Ionicons from '@expo/vector-icons/Ionicons';

type PlaylistDetailPageProps = {
    data: BaseInfos;
    onBack: () => void;
};

export default function PlaylistDetailPage({ data, onBack }: PlaylistDetailPageProps) {
    const { theme } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
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

                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* En-tête avec image et infos */}
                    <View style={{ alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 }}>
                        <View style={styles.containerImgPlaylists}>
                            <Image
                                source={data.cover}
                                style={styles.imagePlaylist1}
                            />
                            <Image
                                source={data.cover}
                                style={styles.imagePlaylist2}
                            />
                            <Image
                                source={data.cover}
                                style={styles.imagePlaylist3}
                            />
                        </View>
                        <AppText size="2xl" style={{ marginTop: 30, textAlign: 'center', fontWeight: 'bold' }}>
                            {data.title}
                        </AppText>
                        <AppText size="sm" color="text2" style={{ marginTop: 8, textAlign: 'center' }}>
                            Description de ma superbe playlist chill avec une superbe cover personnalisée
                        </AppText>
                        
                        {/* Nombre de morceaux et durée */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 10, width: '100%', justifyContent: 'space-between' }}>
                            <AppText size="sm" color="text">
                                {data.nbMusics || 0} Morceaux
                            </AppText>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <AppText size="sm" color="text">45min27</AppText>
                                <Ionicons name="time-outline" size={14} color={theme.colors.text} />
                            </View>
                        </View>
                        <View style={{width: '100%', height: 1, backgroundColor: theme.colors.text, marginTop: 5}}></View>
                    </View>

                    {/* Liste des musiques */}
                    {data.musicList && data.musicList.length > 0 && (
                        <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
                            {data.musicList.map((music, index) => (
                                <View key={index} style={{ marginBottom: 16 }}>
                                    <DetailMusicCard 
                                        infos={music} 
                                        onRemove={() => console.log(`Supprimer ${music.title}`)} 
                                    />
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>

                {/* Bouton flottant en bas à droite */}
                <Pressable
                    onPress={() => setModalVisible(true)}
                    style={{
                        position: 'absolute',
                        bottom: 27,
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

                {/* Modale vide */}
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    presentationStyle="pageSheet"
                >
                    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                        <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={{ alignSelf: 'flex-end', padding: 10 }}
                            >
                                <MaterialIcons name="close" size={24} color={theme.colors.text} />
                            </Pressable>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <AppText size="lg">Modale vide</AppText>
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>
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