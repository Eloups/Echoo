import { View, Image, StyleSheet } from "react-native";
import { BaseInfos } from "../types/baseInfos";
import AppText from "./appText";
import { isSearchBarAvailableForCurrentPlatform, SearchBar } from "react-native-screens";
import { themes } from "../theme";
import { useTheme } from "../theme/provider";

type PageProps = {
    infos: BaseInfos,
    isSearch: boolean
}

// Permet d'afficher une musique, un projet ou un artiste en fonction du paramètre infos.type
export default function MusicCard(props: PageProps){
        const { theme, toggleTheme } = useTheme();
    
    return(
        <View>
            {props.isSearch == false ?(
                <View>
                    <Image source={props.infos.cover} height={95} width={95} style={props.infos.type == "artist" ? styles.imageArtist : styles.imageMusic}></Image>
                    <AppText size={"md"} style={{marginTop: 3}}>{props.infos.title.length > 15 ? props.infos.title.slice(0, 13) + "..." : props.infos.title}</AppText>
                    <AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>{props.infos.artist.length > 16 ? props.infos.artist.slice(0, 15) + "..." : props.infos.artist}</AppText>  
                </View>    
            ):
            // Pour la recherche dans la page Découvrir
            <View style={styles.searchContainer}>
                <Image source={props.infos.cover} height={95} width={95} style={props.infos.type == "artist" ? styles.imageArtistSearch : styles.imageMusicSearch}></Image>
                <View>
                    <AppText size={"md"} style={{marginTop: 3}}>{props.infos.title.length > 40 ? props.infos.title.slice(0, 40) + "..." : props.infos.title}</AppText>
                    
                    {props.infos.type != "artist" ?(<AppText size={"sm"} color="text2" style={{ transform: [{ translateY: -5 }] }}>{props.infos.type == "music" ? ("Morceau"): props.infos.type == "album" ? ("Album") : props.infos.type == "ep" ? ("EP"): ("Single")}  <View style={{backgroundColor: theme.colors.text2 , width: 3, height: 3, borderRadius: 10, transform: "translateY(-1px)"}}></View>  {props.infos.artist.length > 40 ? props.infos.artist.slice(0, 40) + "..." : props.infos.artist}</AppText> ) : <></>} 
                </View>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    imageMusic: {
        height: 95, 
        width: 95, 
        borderRadius: 5
    },
    imageArtist: {
        height: 95, 
        width: 95, 
        borderRadius: 1000
    },
    imageMusicSearch: {
        height: 55, 
        width: 55, 
        borderRadius: 5
    },
    imageArtistSearch: {
        height: 55, 
        width: 55, 
        borderRadius: 1000
    },
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    }
});