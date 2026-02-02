"use client"

import React from "react";
import EchoCompleteLogo from "@/assets/img/EchoCompleteLogo";
import { TextInputGlobal } from "@/lib/components/TextInput";
import { BtnConnexion } from "@/lib/components/BtnConnexion";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";

const AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL


export default function ResetPassword() {
    const params = useParams<{ token: string }>();
    const token = params?.token;
    const router = useRouter();

    React.useEffect(() => {
        console.log("token:", token);
    }, [token]);

    const [mdp, setMdp] = React.useState("");
    const [confirmMdp, setConfirmMdp] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    async function handleResetPassword() {
        // FAIRE LES V2RIFICATION DE CAMP ICIIIII


        if (mdp != "" && token) {
            console.log("mdp = ", mdp);
            console.log("token = ", token);

            setIsLoading(true);
            try {
                const data = await authClient.resetPassword({
                    newPassword: mdp,
                    token: token,
                });

                console.log("Password reset successful:", data);
                
                if(data.error){
                    //Faire l'erreur ici
                }
                else{
                    router.push('/reset-password/success');
                }
            }
            catch (e) { console.log(e); }
            finally {
                setIsLoading(false);
            }
        }

    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", width: "100%" }}>
            <div style={{ marginTop: 40, marginBottom: 20 }}>
                <EchoCompleteLogo height={80} style={{ marginRight: 14 }} />
            </div>
            <div style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "start", paddingTop: 50, display: "flex" }}>
                <div style={{ padding: 30, borderRadius: 10, width: 350, backgroundColor: "#161616", alignItems: "center", display: "flex", flexDirection: "column", gap: 30 }}>
                    <p style={{ fontSize: "1.5rem", color: "#ffffff" }}>Reset Password Page</p>
                    <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 30 }}>
                        <TextInputGlobal text={mdp} setText={setMdp} label="Nouveau Mot de Passe*" star={true} />
                        <TextInputGlobal text={confirmMdp} setText={setConfirmMdp} label="Confirmer Nouveau Mot de Passe*" star={true} />
                        <BtnConnexion title="Réinitialiser le mot de passe" onClick={handleResetPassword} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
}