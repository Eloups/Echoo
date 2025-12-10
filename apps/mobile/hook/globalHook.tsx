import { create } from 'zustand'
import { login } from '../api/Auth/Request'
import { authClient } from '@/lib/auth/auth-client'

const API_BASE = 'https://api.example.com'

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

    // Actions
    setConnected: (connected: boolean) => void;
    setUserId: (id: number | null) => void;
    logout: () => void;
}

const useGlobalHook = create<GlobalHook>((set) => ({
    // État initial
    isConnected: false,
    userId: null,

    login: async (email: string, password: string) => {
        console.log("login in global hook");
        const { data, error } = await authClient.signIn.email({
            email: email,
            password: password
        })
        console.log("data = ", data)
        console.log("error = ", error)

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

    // Déconnexion
    logout: () => set({ isConnected: false, userId: null }),
}))

export default useGlobalHook

