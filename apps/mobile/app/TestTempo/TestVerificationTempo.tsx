import React from "react";
import { View } from "react-native";
import AppText from "@/lib/components/global/appText";
import { verifEmail, verifMdp, verifPseudo } from "@/lib/utils/verifications";

export default function TestVerificationTempo() {
    const [message, setMessage] = React.useState("");

    // Mes tests temporaires
    React.useEffect(() => {

        let _message = "Tests de verification :\n";

        //test verifEmail // pas fini
        let _messageEmail = "";
        if (verifEmail("") == "") { _messageEmail += "     - PB vertif email 1\n"; }
        if (verifEmail("test@example.com") !== "") { _messageEmail += "     - PB vertif email 2\n"; }
        if (verifEmail("testexample.com") == "") { _messageEmail += "     - PB vertif email 3\n"; }
        if (verifEmail("test@examplecom") == "") { _messageEmail += "     - PB vertif email 4\n"; }
        if (verifEmail("test@@example.com") == "") { _messageEmail += "     - PB vertif email 5\n"; }
        if (verifEmail("test@examp@le.com") == "") { _messageEmail += "     - PB vertif email 6\n"; }
        if (verifEmail("@example.com") == "") { _messageEmail += "     - PB vertif email 7\n"; }
        if (_messageEmail === "") {
            _message += " - verifEmail : OK\n";
        } else {
            _message += " - verifEmail : \n" + _messageEmail;
        }


        //test verifPseudo
        let _messagePseudo = "";    

        if (_messagePseudo === "") {
            _message += " - verifPseudo : OK\n";
        } else {
            _message += " - verifPseudo : \n" + _messagePseudo;
        }

        //test verifMdp
        let _messageVerifMdp = "";    

        if (_messageVerifMdp === "") {
            _message += " - verifMdp : OK\n";
        } else {
            _message += " - verifMdp : \n" + _messageVerifMdp;
        }

        setMessage(_message);

    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <AppText
                color="text"
                size="xl"
            >
                {message}
            </AppText>
        </View>
    )

}