import { View, ScrollView, Image, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/appText';
import { BaseInfos } from '../types/baseInfos';

type AlbumDetailPageProps = {
    data: BaseInfos;
    onBack: () => void;
};

export default function AlbumDetailPage({ data, onBack }: AlbumDetailPageProps) {
    const { theme } = useTheme();

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
                    backgroundColor: theme.colors.background2, 
                    width: 40, 
                    height: 40, 
                    borderRadius: 20, 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}
            >
                <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
            </Pressable>
            
            <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Image 
                        source={data.cover} 
                        style={{ width: 250, height: 250, borderRadius: 10 }}
                    />
                    <AppText size="2xl" style={{ marginTop: 20, textAlign: 'center' }}>{data.title}</AppText>
                    {data.artist && (
                        <AppText size="md" color="text2" style={{ marginTop: 5, textAlign: 'center' }}>
                            {Array.isArray(data.artist) ? data.artist.join(', ') : data.artist}
                        </AppText>
                    )}
                    {data.type && (
                        <AppText size="sm" color="text2" style={{ marginTop: 5 }}>
                            {data.type === "album" ? "Album" : 
                             data.type === "ep" ? "EP" : 
                             data.type === "single" ? "Single" : data.type}
                        </AppText>
                    )}
                    {data.nbStreams && (
                        <AppText size="sm" color="text2" style={{ marginTop: 5 }}>
                            {data.nbStreams.toLocaleString()} écoutes
                        </AppText>
                    )}
                </View>

                {/* Liste des morceaux de l'album */}
                {data.musicList && data.musicList.length > 0 && (
                    <View style={{ marginTop: 20 }}>
                        <AppText size="lg" style={{ marginBottom: 10 }}>Pistes</AppText>
                        {data.musicList.map((music, index) => (
                            <View 
                                key={index} 
                                style={{ 
                                    marginBottom: 15, 
                                    padding: 10, 
                                    backgroundColor: theme.colors.background2, 
                                    borderRadius: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <AppText size="sm" color="text2" style={{ marginRight: 10, width: 20 }}>
                                    {index + 1}
                                </AppText>
                                <View style={{ flex: 1 }}>
                                    <AppText>{music.title}</AppText>
                                    <AppText size="sm" color="text2">
                                        {Array.isArray(music.artist) ? music.artist.join(', ') : music.artist}
                                    </AppText>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
        </SafeAreaView>
    );
}
