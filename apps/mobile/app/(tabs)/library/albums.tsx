import ProjectCard from "@/lib/components/projectCard";
import { useTheme } from "@/lib/theme/provider";
import { Project } from "@/lib/types/types";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import AppText from "@/lib/components/global/appText";

export default function Albums() {
    const { theme } = useTheme();
    const [albums, setAlbums] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    if (loading) {
        return (
            <View style={{ backgroundColor: theme.colors.background, height: "100%", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <AppText style={{ marginTop: 10 }}>Chargement des albums...</AppText>
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>
            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15 }} style={{ paddingLeft: 20, height: "100%", paddingTop: 20 }}>
                {albums.map((album, key) =>
                    <ProjectCard key={key} infos={album} isSearch={false}></ProjectCard>
                )}
            </ScrollView>
        </View>
    )
}
