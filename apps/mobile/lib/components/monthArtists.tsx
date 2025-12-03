import { View } from "react-native";
import { BaseInfos } from "../types/types"
import SmallArtist from "./smallArtist";

type PageProps = {
    artistList: BaseInfos[];
}

export default function MonthArtists(props: PageProps) {
    return (
        <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: "stretch", justifyContent: "center", columnGap: 30, rowGap: 11}}>
            {props.artistList.map((artist, i) => <SmallArtist key={i} artist={artist}></SmallArtist>)}
        </View>
    )
}