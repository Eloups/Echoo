import { View, ScrollView, Image, Pressable, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/appText';
import { BaseInfos } from '../types/baseInfos';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DetailMusicCard from './detailMusicCard';

type AlbumDetailPageProps = {
    data: BaseInfos;
    onBack: () => void;
};

export default function AlbumDetailPage({ data, onBack }: AlbumDetailPageProps) {
    const { theme } = useTheme();
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

            {menuVisible && (
                <Pressable
                    style={styles.menuOverlay}
                    onPress={() => setMenuVisible(false)}
                />
            )}
            
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* En-tête avec image et infos */}
                <View style={{ alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 }}>
                    <Image 
                        source={data.cover} 
                        style={{ width: 200, height: 200, borderRadius: 5 }}
                    />
                    <AppText size="2xl" style={{ marginTop: 30, textAlign: 'center', fontWeight: 'bold' }}>
                        {data.title}
                    </AppText>
                    {data.artist && (
                        <AppText size="sm" color="text2" style={{ marginTop: 8, textAlign: 'center' }}>
                            {Array.isArray(data.artist) ? data.artist.join(', ') : data.artist}
                        </AppText>
                    )}
                    
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
                                    isAlbum={true}
                                />
                            </View>
                        ))}
                    </View>
                )}
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
