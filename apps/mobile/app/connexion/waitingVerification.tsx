import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import useAuthHook from '../../hook/authHook';
import EchoCompleteLogo from '@/assets/img/EchoCompleteLogo';
import AppText from '@/lib/components/global/appText';
import { BtnConnexion } from '@/lib/components/global/BtnConnexion';

export default function WaitingVerificationScreen() {
    const router = useRouter();
    const { sendVerificationEmail, isLoading } = useAuthHook();
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const loadEmail = async () => {
            const savedEmail = await SecureStore.getItemAsync('pendingVerificationEmail');
            if (savedEmail) {
                setEmail(savedEmail);
            }
        };
        loadEmail();
    }, []);
    
    const handleResendEmail = () => {
        if (email && email.trim() !== "") {
            sendVerificationEmail(email);
        }
    };

    return (
        <View style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 120,
            paddingHorizontal: 20,
            gap: 40,
        }}>
            <EchoCompleteLogo height={40} width={159} />

            <View style={{ width: "100%", alignItems: "center", gap: 30 }}>
                <AppText size="3xl" weight="bold">Vérifiez votre email</AppText>

                <View style={{ alignItems: "center", gap: 15 }}>
                    <AppText size="lg" style={{ textAlign: "center" }}>
                        Un email de vérification a été envoyé à :
                    </AppText>
                    <AppText size="lg" weight="bold" style={{ textAlign: "center" }}>
                        {email}
                    </AppText>
                    <AppText size="md" style={{ textAlign: "center", marginTop: 10 }}>
                        Cliquez sur le lien dans l'email pour activer votre compte.
                        Le lien ouvrira une page web pour confirmer votre adresse.
                    </AppText>
                </View>

                <View style={{ width: "100%", gap: 15, marginTop: 20 }}>
                    <BtnConnexion
                        title="Renvoyer l'email"
                        onClick={handleResendEmail}
                        isLoading={isLoading}
                    />

                    <AppText
                        size="md"
                        style={{ color: "#007AFF", textAlign: "center", textDecorationLine: "underline" }}
                        onPress={() => router.push('/connexion/connexion')}
                    >
                        Retour à la connexion
                    </AppText>
                </View>

                <View style={{ marginTop: 20, padding: 15, borderRadius: 8 }}>
                    <AppText size="md" style={{ textAlign: "center" }}>
                        Une fois votre email vérifié sur le site web, retournez à la page de connexion.
                    </AppText>
                </View>
            </View>
        </View>
    );
}