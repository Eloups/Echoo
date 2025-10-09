import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";

export default function ConnexionScreen() {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "blue",
            }}
        >
            
           <Image
                source={require("../../assets/img/Echo complete logo 2.svg")}
                style={{ width: 240, height: 61 }}
            />

            





        </View>
    );


}