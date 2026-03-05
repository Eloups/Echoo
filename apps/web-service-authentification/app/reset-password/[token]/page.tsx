"use client"

import React from "react";
import EchoCompleteLogo from "@/assets/img/EchoCompleteLogo";
import { TextInputGlobal } from "@/lib/components/TextInput";
import { BtnConnexion } from "@/lib/components/BtnConnexion";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { passwordSchema } from "@/lib/validations/authSchema";
import { z } from "zod";

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
    const [mdpError, setMdpError] = React.useState("");
    const [confirmMdpError, setConfirmMdpError] = React.useState("");
    const [generalError, setGeneralError] = React.useState("");

    async function handleResetPassword() {
        // Réinitialiser les erreurs
        setMdpError("");
        setConfirmMdpError("");
        setGeneralError("");

        // Validation du mot de passe avec Zod
        try {
            passwordSchema.parse(mdp);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setMdpError(error.issues[0].message);
                return;
            }
        }

        // Vérifier que les mots de passe correspondent
        if (mdp !== confirmMdp) {
            setConfirmMdpError("Les mots de passe ne correspondent pas");
            return;
        }

        if (mdp && token) {
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
                    setGeneralError(data.error.message || "Une erreur est survenue");
                }
                else{
                    router.push('/reset-password/success');
                }
            }
            catch (e) { 
                console.log(e);
                setGeneralError("Une erreur est survenue lors de la réinitialisation");
            }
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
                    {generalError && (
                        <p style={{ color: "#FF4444", fontSize: "0.875rem", textAlign: "center" }}>
                            {generalError}
                        </p>
                    )}
                    <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 30 }}>
                        <TextInputGlobal text={mdp} setText={setMdp} label="Nouveau Mot de Passe*" star={true} error={mdpError} />
                        <TextInputGlobal text={confirmMdp} setText={setConfirmMdp} label="Confirmer Nouveau Mot de Passe*" star={true} error={confirmMdpError} />
                        <BtnConnexion title="Réinitialiser le mot de passe" onClick={handleResetPassword} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
}