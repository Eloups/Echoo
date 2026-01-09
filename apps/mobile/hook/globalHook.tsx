import { create } from 'zustand'
import { login } from '../api/Auth/Request'
import { authClient } from '@/lib/auth/auth-client'
import type { VerifyAuthResponse } from '@/lib/types/auth'
import { User } from '@/lib/types/auth'

const API_BASE = 'https://api.example.com'
const API_BASE_AUTH = 'http://192.168.1.57:3333'

/**
 * Hook global pour l'état de l'application
 * Utilisé pour les données partagées entre tous les composants
 */

interface GlobalHook {
    login: (email: string, password: string) => void
    register: (name: string, email: string, password: string) => void
    // État de l'application
    isConnected: boolean;
    userId: number | null;
    user: User | null;

    // Actions
    setConnected: (connected: boolean) => void;
    setUserId: (id: number | null) => void;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const useGlobalHook = create<GlobalHook>((set) => ({
    // État initial
    isConnected: false,
    userId: null,
    user: null,

    login: async (email: string, password: string) => {
        console.log("login in global hook");
        const { data, error } = await authClient.signIn.email({
            email: email,
            password: password
        })
        console.log("data = ", data)
        console.log("error = ", error)

        const JWT = await authClient.token()
        console.log("JWT = ", JWT)

        // Vérifier le JWT auprès du service d'auth
        if(JWT && JWT?.data && JWT?.data?.token) {
            const tokenValue = JWT.data.token;
            console.log("Token value = ", tokenValue);

            try {
                const res = await fetch(`${API_BASE_AUTH}/api/auth/verify`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: tokenValue })
                });

                const json = await res.json();
                console.log('verify response =', json);

                if (res.ok && json.status === 'SUCCESS') {
                    set({ isConnected: true });

                    const uid = json.decoded?.sub ?? json.decoded?.id ?? json.decoded?.userId;
                    let idNum: number | null = null;
                    if (uid !== undefined && uid !== null) {
                        const parsed = Number(uid);
                        idNum = Number.isNaN(parsed) ? null : parsed;
                    }
                    set({ userId: idNum });
                    
                    // Créer et stocker l'objet User
                    if (json.decoded) {
                        const newUser = User.fromJWTPayload(json.decoded);
                        set({ user: newUser });
                    }
                } else {
                    console.warn('Token verification failed', json);
                    set({ isConnected: false, userId: null });
                }
            } catch (e) {
                console.error('verify error', e);
                set({ isConnected: false, userId: null });
            }
        }
        
        // login(email, password);
    },
    register: async (name: string, email: string, password: string) => {
        console.log("ici1")
        const { data, error } = await authClient.signUp.email({
            name: name,
            email: email,
            password: password
        });
        console.log("data = ", data)
        console.log("error = ", error)

        const JWT = await authClient.token()
        console.log("JWT = ", JWT)

        

        // await authClient.changeEmail()
        // console.log("JWT = ", JWT.data?.keys)


    },
    // Définir l'état de connexion
    setConnected: (connected: boolean) => set({ isConnected: connected }),

    // Définir l'ID utilisateur
    setUserId: (id: number | null) => set({ userId: id }),

    // Définir l'utilisateur
    setUser: (user: User | null) => set({ user }),

    // Déconnexion
    logout: () => set({ isConnected: false, userId: null, user: null }),
}))

export default useGlobalHook

