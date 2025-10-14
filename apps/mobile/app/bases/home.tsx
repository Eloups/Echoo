import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "@/lib/theme/provider";

export default function home() {
    const { theme, toggleTheme } = useTheme();
    const cover = require("../../assets/tempImg/Covers_Albums/HMHAS.jpg");

    return (
        null
        // <View style={styles.view}>
        //     <View>
        //         <Image source={cover} style={{ width: 144, height: 144 }} />
        //         <Text>Hit Me Hard And Soft</Text>
        //     </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    view: {
    }
});