import { View, ScrollView, Image, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import { Project } from '@/lib/types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DetailMusicCard from '@/lib/components/detailMusicCard';
import { useLocalSearchParams } from 'expo-router';

const IMAGE_SIZE = 200;

export default function MusiquesPage() {
    const { theme } = useTheme();
    const params = useLocalSearchParams();
    const [menuVisible, setMenuVisible] = useState(false);

    const data: Project = params.data ? JSON.parse(params.data as string) : null;

    if (!data) {
        return null;
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
                <View style={{ alignItems: 'center', paddingTop: 60, paddingBottom: 20 }}>
                    <Image 
                        source={data.cover} 
                        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 5 }}
                    />
                    <AppText size="2xl" style={{ marginTop: 20, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 20 }}>
                        {data.title}
                    </AppText>
                    <AppText size="md" color="text2" style={{ marginTop: 5 }}>
                        {Array.isArray(data.artist) ? data.artist.join(', ') : data.artist}
                    </AppText>
                    {data.musics && data.musics.length > 0 && (
                        <AppText size="sm" color="text2" style={{ marginTop: 5 }}>
                            {data.musics.length} morceaux
                        </AppText>
                    )}
                </View>

                <View style={{ paddingHorizontal: 20 }}>
                    {data.musics?.map((music, index) => (
                        <View key={index} style={{ marginBottom: 16 }}>
                            <DetailMusicCard 
                                infos={music}
                                isAlbum={true}
                                queue={data.musics || []}
                                index={index}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
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
