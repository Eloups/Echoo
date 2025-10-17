import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Playlists(){
    const navigation = useNavigation();
        useEffect(() => {
            navigation.setOptions({
                title: "Bibilothèque",
                subtitle: "Playlists",
            } as any);
        }, [navigation]);
    return(
        <View>
            
        </View>
    )
}