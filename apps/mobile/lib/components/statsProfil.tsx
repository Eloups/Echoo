import React from "react"
import { View } from "react-native"
import AppText from "./global/appText"
import { useTheme } from "../theme/provider"

type Props = {}

export default function StatsProfil(_: Props) {
    const { theme } = useTheme()

    const rows = [
        { label: "Nombre de musiques écoutées", value: "33" },
        { label: "Temps écouté", value: "8 527h" },
        { label: "Nombre d'artistes suivis", value: "37" },
        { label: "Nombre de morceaux ajoutés", value: "732" },
        { label: "A rejoint Echoo le", value: "27/12/2025" },
    ]

    return (
        <View style={{ width: "100%"}}>
            <AppText size={"2xl"} style={{ marginBottom: 12 }}>Statistiques</AppText>
            <View style={{ height: 1, backgroundColor: theme?.colors?.primary, marginBottom: 12 }} />

            {rows.map((r, i) => (
                <View key={i}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12 }}>
                        <AppText>{r.label}</AppText>
                        <AppText>{r.value}</AppText>
                    </View>
                    <View style={{ height: 1, backgroundColor: theme?.colors?.primary }} />
                </View>
            ))}
        </View>
    )
}