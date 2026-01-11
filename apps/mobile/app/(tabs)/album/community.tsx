import { View, ScrollView, Image, Pressable, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import { BaseInfos } from '@/lib/types/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams } from 'expo-router';

const IMAGE_SIZE = 120;

type Comment = {
    id: number;
    username: string;
    avatar: any;
    text: string;
    time: string;
};

export default function CommunityPage() {
    const { theme } = useTheme();
    const params = useLocalSearchParams();
    const [rating, setRating] = useState(0);

    const data: BaseInfos = params.data ? JSON.parse(params.data as string) : null;

    if (!data) {
        return null;
    }

    // Données temporaires pour les commentaires
    const comments: Comment[] = [
        {
            id: 1,
            username: "Sonyos",
            avatar: data.cover,
            text: "Lorem ipsum",
            time: "17:42"
        },
        {
            id: 2,
            username: "Badelinne",
            avatar: data.cover,
            text: "Lorem ipsum dolor sit amet",
            time: "16:38"
        },
        {
            id: 3,
            username: "Madelime",
            avatar: data.cover,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
            time: "11:01"
        }
    ];

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* En-tête avec image et infos */}
                <View style={{ alignItems: 'center', paddingTop: 60, paddingBottom: 20 }}>
                    <Image 
                        source={data.cover} 
                        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 5 }}
                    />
                    <AppText size="xl" style={{ marginTop: 15, fontWeight: 'bold', textAlign: 'center' }}>
                        {data.title}
                    </AppText>
                    <AppText size="sm" color="text2" style={{ marginTop: 5 }}>
                        {data.artist}
                    </AppText>

                    {/* Notation */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, gap: 8 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Pressable key={star} onPress={() => setRating(star)}>
                                <MaterialIcons 
                                    name={star <= rating ? "star" : "star-border"} 
                                    size={32} 
                                    color={star <= rating ? theme.colors.primary : theme.colors.text2} 
                                />
                            </Pressable>
                        ))}
                    </View>
                    <AppText size="sm" color="text2" style={{ marginTop: 5 }}>
                        4.3/5 (267)
                    </AppText>
                </View>

                {/* Section Commentaires */}
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <AppText size="xl" style={{ fontWeight: 'bold' }}>Commentaires</AppText>
                        <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.primary, marginLeft: 15 }} />
                    </View>

                    {comments.map((comment) => (
                        <View key={comment.id} style={{ flexDirection: 'row', marginBottom: 20, gap: 12 }}>
                            <Image 
                                source={comment.avatar} 
                                style={{ width: 40, height: 40, borderRadius: 20 }}
                            />
                            <View style={{ flex: 1 }}>
                                <AppText size="sm" color="text2" style={{ marginBottom: 4 }}>
                                    {comment.username}
                                </AppText>
                                <View style={[styles.commentBubble, { backgroundColor: theme.colors.primary }]}>
                                    <AppText size="sm">
                                        {comment.text}
                                    </AppText>
                                </View>
                                <AppText size="xs" color="text2" style={{ marginTop: 4, alignSelf: 'flex-end' }}>
                                    {comment.time}
                                </AppText>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Bouton flottant pour ajouter un commentaire */}
            <Pressable
                style={[styles.floatingButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => console.log('Ouvrir modal commentaire')}
            >
                <MaterialIcons name="chat-bubble" size={28} color={theme.colors.text} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    commentBubble: {
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        maxWidth: '90%',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
