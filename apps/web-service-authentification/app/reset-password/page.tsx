"use client"

import React from "react";
import EchoCompleteLogo from "@/assets/img/EchoCompleteLogo";
import { TextInputGlobal } from "@/lib/components/TextInput";
import { BtnConnexion } from "@/lib/components/BtnConnexion";

export default function PageTestResetPassword() {

    const [mdp, setMdp] = React.useState("");
    const [confirmMdp, setConfirmMdp] = React.useState("");

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", width: "100%" }}>
            <div style={{ marginTop: 40, marginBottom: 20 }}>
                <EchoCompleteLogo height={80} style={{ marginRight: 14 }} />
            </div>
            <div style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "start", paddingTop: 50, display: "flex" }}>
                <div style={{ padding: 30, borderRadius: 10, width: 350, backgroundColor: "#161616", alignItems: "center", display: "flex", flexDirection: "column", gap: 30 }}>
                    <p style={{ fontSize: "1.5rem", color: "#ffffff" }}>Reset Password</p>
                    <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 30 }}>
                        <TextInputGlobal text={mdp} setText={setMdp} label="Nouveau Mot de Passe*" star={true} />
                        <TextInputGlobal text={confirmMdp} setText={setConfirmMdp} label="Confirmer Nouveau Mot de Passe*" star={true} />
                        <BtnConnexion title="Réinitialiser le mot de passe" onClick={() => { console.log("Reset password clicked") }} />
                    </div>
                </div>
            </div>
        </div>
    );
}