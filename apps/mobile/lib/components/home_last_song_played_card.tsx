import { View, Image, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import AppText from "./global/appText";
import { Music } from "../types/types";
import usePlayerStore from "@/hook/usePlayerStore";
import { useEffect, useState } from "react";
import { AlbumService } from "../api";

type PageProps = {
    music: Music
}

export default function LastSongPlayedCard(props: PageProps) {
    const { playTrack } = usePlayerStore();
    const [trackColors, setTrackColors] = useState<{ color1: string; color2: string } | null>(null);

    useEffect(() => {
        const fetchTrackColors = async () => {
            try {
                const response = await AlbumService.getMusicColors(props.music.id);

                if (response?.colors?.color1 && response?.colors?.color2) {
                    setTrackColors({
                        color1: response.colors.color1,
                        color2: response.colors.color2,
                    });
                } else {
                    setTrackColors(null);
                }
            } catch (error) {
                setTrackColors(null);
            }
        };

        fetchTrackColors();
    }, [props.music.id]);
    
    const colors: [string, string] = [
        trackColors?.color1 || props.music.color1 || '#1a1a1a',
        trackColors?.color2 || props.music.color2 || '#2a2a2a'
    ];

    const handlePress = () => {
        const fileName = props.music.audioFile || 'default.mp3';
        playTrack(props.music, fileName);
    };

    // Gérer l'affichage de l'artiste (string ou array)
    const artistDisplay = Array.isArray(props.music.artist) 
        ? props.music.artist.join(', ') 
        : props.music.artist;

    return (
        <Pressable onPress={handlePress}>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: '100%',
                    gap: 10,
                    borderRadius: 5,
                    alignItems: "center"
                }}
            >
                <Image 
                    source={props.music.cover} 
                    height={42} 
                    width={42} 
                    style={{ height: 50, width: 50, borderRadius: 5 }}
                />
                <View style={{ display: "flex" }}>
                    <AppText size={"lg"} style={{ transform: [{ translateY: 3 }] }}>
                        {props.music.title.length > 30 ? props.music.title.slice(0, 30) + "..." : props.music.title}
                    </AppText>
                    <AppText size={"xs"} color="text" style={{ transform: [{ translateY: -3 }] }}>
                        {artistDisplay.length > 30 ? artistDisplay.slice(0, 30) + "..." : artistDisplay}
                    </AppText>
                </View>
            </LinearGradient>
        </Pressable>
    );
}