import { View } from "react-native";
import { Music } from "../types/types"
import SmallArtist from "./smallArtist";
import SmallMuisc from "./smallMusic";

type PageProps = {
    musicList: Music[];
}

export default function MonthMusics(props: PageProps) {
    return (
        <View style={{display: "flex", alignSelf: "stretch", justifyContent: "center", columnGap: 30, rowGap: 11, paddingHorizontal: 24}}>
            {props.musicList.map((music, i) => <SmallMuisc key={i} music={music}></SmallMuisc>)}
        </View>
    )
}