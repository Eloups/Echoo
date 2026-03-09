import { View, ScrollView, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import { Artist, Music } from '../types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MusicCard from './musicCard';

type ArtistDetailPageProps = {
    data: Artist;
    onBack: () => void;
};

// Composant Header réutilisable
function ArtistHeader({ data, theme, onBack, menuVisible, setMenuVisible }: any) {
    return (
        <>
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
                            <MaterialIcons name="share" size={20} color={theme.colors.text} />
                            <AppText style={{ marginLeft: 12 }}>Partager</AppText>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: theme.colors.background, marginVertical: 4 }} />
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                            }}
                        >
                            <MaterialIcons name="person-add" size={20} color={theme.colors.text} />
                            <AppText style={{ marginLeft: 12 }}>Suivre l'artiste</AppText>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <View style={{ alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 }}>
                <Image 
                    source={data.cover} 
                    style={{ width: 120, height: 120, borderRadius: 60 }}
                />
                <AppText size="2xl" style={{ marginTop: 20, textAlign: 'center', fontWeight: 'bold' }}>
                    {data.title}
                </AppText>
                {data.nbStreams && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 }}>
                        <AppText size="sm" color="text">{data.nbStreams.toLocaleString()}</AppText>
                        <MaterialIcons name="favorite" size={16} color={theme.colors.text} />
                    </View>
                )}
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 15, marginBottom: 30 }}>
                <AppText size="sm" color="text2" style={{ textAlign: 'center' }}>
                    Description de l'artiste gteszet zeeht szh trzesh trzs htrz hi trzs htzrs htrz ht rsh tgdr httds htrs htrs ht rsh t rsh trs ui yfkjujfyk ufyj uftj yuftkujf kufijuf uf.
                </AppText>
            </View>
        </>
    );
}

// Composants pour chaque tab
function PresentationTab({ data }: { data: Artist }) {
    const { theme } = useTheme();
    const popularTracks: Music[] = data.popular_musics?.slice(0, 5) || [];
    const recentReleases: Music[] = data.last_releases?.slice(0, 4) || [];

    return (
        <View>
            {/* Morceaux populaires */}
            <View style={{ paddingHorizontal: 20 }}>
                <AppText size="xl" style={{ marginBottom: 15, fontWeight: 'bold' }}>Morceaux populaires</AppText>
                {popularTracks.map((track, index) => (
                    <View key={index} style={{ marginBottom: 16 }}>
                        <MusicCard 
                            infos={track}
                            type="music"
                            isHome={true}
                            isSearch={false}
                        />
                    </View>
                ))}
            </View>

            {/* Dernières sorties */}
            <View style={{ marginTop: 30, paddingHorizontal: 20, marginBottom: 30 }}>
                <AppText size="xl" style={{ marginBottom: 15, fontWeight: 'bold' }}>Dernières sorties</AppText>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }}>
                    {recentReleases.map((release, index) => (
                        <View key={index} style={{ width: 150 }}>
                            <Image source={release.cover} style={{ width: 150, height: 150, borderRadius: 5 }} />
                            <AppText size="md" numberOfLines={1} style={{ marginTop: 8 }}>{release.title}</AppText>
                            <AppText size="sm" color="text2" numberOfLines={1}>Single</AppText>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

function ProjetsTab() {
    return (
        <View style={{ padding: 20 }}>
            <AppText size="lg">Projets à venir...</AppText>
        </View>
    );
}

function SinglesTab() {
    return (
        <View style={{ padding: 20 }}>
            <AppText size="lg">Singles à venir...</AppText>
        </View>
    );
}

function MorceauxTab() {
    return (
        <View style={{ padding: 20 }}>
            <AppText size="lg">Morceaux à venir...</AppText>
        </View>
    );
}

export default function ArtistDetailPage({ data, onBack }: ArtistDetailPageProps) {
    const { theme } = useTheme();
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState<'presentation' | 'projets' | 'singles' | 'morceaux'>('presentation');

    const renderContent = () => {
        switch (selectedTab) {
            case 'presentation':
                return <PresentationTab data={data} />;
            case 'projets':
                return <ProjetsTab />;
            case 'singles':
                return <SinglesTab />;
            case 'morceaux':
                return <MorceauxTab />;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                    <ArtistHeader 
                        data={data} 
                        theme={theme} 
                        onBack={onBack}
                        menuVisible={menuVisible}
                        setMenuVisible={setMenuVisible}
                    />
                    {renderContent()}
                </ScrollView>

                {/* Barre de navigation secondaire */}
                <View style={styles.tabBarContainer}>
                    <View style={[styles.tabBar, { backgroundColor: theme.colors.background2 }]}>
                        <Pressable
                            style={[
                                styles.tabItem,
                                selectedTab === 'presentation' && [{ backgroundColor: theme.colors.primary }]
                            ]}
                            onPress={() => setSelectedTab('presentation')}
                        >
                            <AppText size="sm" color={selectedTab === 'presentation' ? 'text' : 'text2'}>
                                Présentation
                            </AppText>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.tabItem,
                                selectedTab === 'projets' && [{ backgroundColor: theme.colors.primary }]
                            ]}
                            onPress={() => setSelectedTab('projets')}
                        >
                            <AppText size="sm" color={selectedTab === 'projets' ? 'text' : 'text2'}>
                                Projets
                            </AppText>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.tabItem,
                                selectedTab === 'singles' && [{ backgroundColor: theme.colors.primary }]
                            ]}
                            onPress={() => setSelectedTab('singles')}
                        >
                            <AppText size="sm" color={selectedTab === 'singles' ? 'text' : 'text2'}>
                                Singles
                            </AppText>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.tabItem,
                                selectedTab === 'morceaux' && [{ backgroundColor: theme.colors.primary }]
                            ]}
                            onPress={() => setSelectedTab('morceaux')}
                        >
                            <AppText size="sm" color={selectedTab === 'morceaux' ? 'text' : 'text2'}>
                                Morceaux
                            </AppText>
                        </Pressable>
                    </View>
                </View>
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
    tabBarContainer: {
        position: 'absolute',
        bottom: 90,
        left: 15,
        right: 15,
        zIndex: 10,
    },
    tabBar: {
        flexDirection: 'row',
        borderRadius: 50,
        padding: 5,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 25,
    }
});
