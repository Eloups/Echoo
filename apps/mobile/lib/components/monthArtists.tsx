import { View } from "react-native";
import { Artist } from "../types/types"
import SmallArtist from "./smallArtist";

type PageProps = {
    artistList: Artist[];
}

export default function MonthArtists(props: PageProps) {
    return (
        <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: "stretch", justifyContent: "center", columnGap: 30, rowGap: 11}}>
            {props.artistList.map((artist, i) => <SmallArtist key={i} artist={artist}></SmallArtist>)}
        </View>
    )
}