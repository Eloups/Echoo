import { Pressable, StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useSegments } from 'expo-router';
import AppText from './global/appText';
import { Project } from '../types/types';

type ArtistProjectCardData = Project & {
    id?: number;
    color1?: string;
    color2?: string;
    year?: number | string;
    nbTitles?: number;
};

type ProjectCardArtistPageProps = {
    infos: ArtistProjectCardData;
};

export default function ProjectCardArtistPage({ infos }: ProjectCardArtistPageProps) {
    const segments = useSegments();

    const handlePress = () => {
        const currentPath = '/' + segments.join('/');

        router.push({
            pathname: '/(tabs)/detail',
            params: {
                data: JSON.stringify(infos),
                from: currentPath,
                detailType: 'project',
                idProject: infos.id,
            },
        });
    };

    const projectTypeLabel = (() => {
        if (!infos.type) return 'Projet';
        const upperType = infos.type.toUpperCase();
        if (upperType === 'EP') return 'EP';
        return upperType.charAt(0) + upperType.slice(1).toLowerCase();
    })();

    return (
        <Pressable onPress={handlePress} style={styles.pressable}>
            <LinearGradient
                colors={[infos.color1 || '#1B2A4A', infos.color2 || '#0C1320']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <Image source={infos.cover} style={styles.cover} />

                <View style={styles.content}>
                    <AppText size="md" style={styles.title}>
                        {infos.title}
                    </AppText>

                    <AppText size="md" style={styles.metaBottom} color='text2'>
                        {projectTypeLabel}
                        {infos.year ? `  •  ${infos.year}` : ''}
                    </AppText>
                </View>
            </LinearGradient>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        width: '100%',
    },
    card: {
        borderRadius: 10,
        padding: 14,
        minHeight: 230,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    cover: {
        width: '80%',
        aspectRatio: 1,
        borderRadius: 5,
        marginBottom: 14,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
    },
    metaTop: {
        marginTop: 4,
        textAlign: 'center',
        fontWeight: '600',
    },
    metaBottom: {
        marginTop: 14,
        textAlign: 'center',
        opacity: 0.9,
        fontWeight: '600',
    },
});
