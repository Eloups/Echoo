import { View } from "react-native";
import { Artist } from "../types/types"
import SmallArtist from "./smallArtist";
import AppText from "./global/appText";

type PageProps = {
    artistList: Artist[];
}

export default function MonthArtists(props: PageProps) {
    if (props.artistList.length === 0) {
        return (
            <View style={{ flex: 1, alignSelf: "stretch", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <AppText color="text2">Aucun artiste n'a gagné de streams ce mois-ci.</AppText>
            </View>
        );
    }

    return (
        <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: "stretch", justifyContent: "center", columnGap: 30, rowGap: 11}}>
            {props.artistList.map((artist, i) => <SmallArtist key={i} artist={artist}></SmallArtist>)}
        </View>
    )
}