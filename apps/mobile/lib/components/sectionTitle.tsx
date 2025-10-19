import { View } from "react-native"
import AppText from "./global/appText"
import { useTheme } from "../theme/provider";


type PageProps = {
    text: string
}

export default function SectionTitle(props: PageProps){
    const { theme, toggleTheme } = useTheme();
    return (
        <View style={{display: "flex", flexDirection:"row", alignItems: "center", gap: 12, marginHorizontal: 24, marginVertical: 10}}>
            <AppText size={"2xl"}>{props.text}</AppText>
            <View style={{backgroundColor: theme.colors.primary, height: 1, flex: 1 }}></View>
        </View>
    )
}