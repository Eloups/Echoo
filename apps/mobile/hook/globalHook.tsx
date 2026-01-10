import { create } from 'zustand'
import { login } from '../api/Auth/Request'
import { authClient } from '@/lib/auth/auth-client'
import type { VerifyAuthResponse } from '@/lib/types/auth'
import { User } from '@/lib/types/auth'
import { router } from 'expo-router'

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
    user: User | null;

    // Actions
    logout: () => void;

    // Auth UI state
    isLoading: boolean;
    authError: string | null;
    setAuthLoading: (loading: boolean) => void;
    setAuthError: (error: string | null) => void;

    checkToken: () => void;
    tokenIsExpired: () => boolean;
}

const useGlobalHook = create<GlobalHook>((set, get) => ({
    // État initial
    user: null,
    isLoading: false,
    authError: null,

    login: async (email: string, password: string) => {
        set({ isLoading: true, authError: null });

        const { data, error } = await authClient.signIn.email({
            email: email,
            password: password
        })

        if (error) {
            // ICIIIIIII a voir pour mettre un message d'erreur a la main pour l'avoir en français 
            // et pour que ce ne soit pas dirrectement l'erreur du serveur
            set({ isLoading: false, authError: error.message ?? String(error) });
            return;
        }

        if (data) {
            const JWT = await authClient.token()
            // console.log("JWT = ", JWT)

            // décoder le JWT pour avoir les infos de l'utilisateur 
            // (dont l'id pour ensouite prendre les infos supplémentaire dans l'API backend)
            if (JWT && JWT?.data && JWT?.data?.token) {
                const tokenValue = JWT.data.token;
                // console.log("Token value = ", tokenValue);

                try {
                    const res = await fetch(`${API_BASE_AUTH}/api/auth/verify`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token: tokenValue })
                    });

                    const json = await res.json();
                    console.log('verify response =', json);

                    if (res.ok && json.status === 'SUCCESS' && json.decoded) {
                        // Créer et stocker l'objet User
                        set({ user: User.fromJWTPayload(json.decoded) });
                    } else {
                        console.warn('Token verification failed', json);
                        set({ authError: json.message ?? 'Token verification failed' });
                    }
                } catch (e: any) {
                    console.error('verify error', e);
                    set({ authError: e.message ?? String(e) });
                    set({ isLoading: false });
                    return;
                }

                try {
                    // ICIIIII 
                    // Prendre les infos supplémentaire de l'utilisateur dans l'API backend 
                    // (role etc..)
                } catch (e: any) {
                    console.error('verify error', e);
                    set({ authError: e.message ?? String(e) });
                    set({ isLoading: false });
                    return;
                }

                // Tout est bon, rediriger vers l'écran principal
                router.push('/(tabs)/home');
            }
        }
        set({ isLoading: false });
    },
    register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, authError: null });

        const { data, error } = await authClient.signUp.email({
            name: name,
            email: email,
            password: password
        });
        console.log("data = ", data)
        console.log("error = ", error)

        if (error) {
            // ICIIIIIII a voir pour mettre un message d'erreur a la main pour l'avoir en français 
            // et pour que ce ne soit pas dirrectement l'erreur du serveur
            set({ isLoading: false, authError: error.message ?? String(error) });
            return;
        }

        if (data) {
            const JWT = await authClient.token()
            // console.log("JWT = ", JWT)

            // décoder le JWT pour avoir les infos de l'utilisateur 
            // (dont l'id pour ensouite le crée dans l'API backend)
            if (JWT && JWT.data && JWT.data.token) {
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

                    if (res.ok && json.status === 'SUCCESS' && json.decoded) {
                        // Créer et stocker l'objet User
                        set({ user: User.fromJWTPayload(json.decoded) });
                    } else {
                        console.warn('Token verification failed', json);
                        set({ authError: json.message ?? 'Token verification failed' });
                    }
                } catch (e: any) {
                    console.error('verify error', e);
                    set({ authError: e.message ?? String(e) });
                    set({ isLoading: false });
                    return;
                }

                try {
                    // ICIIIII 
                    // Crée l'utilisateur dans le back & prendre les infos supplémentaire de l'utilisateur dans l'API backend 
                    // (role etc..)
                } catch (e: any) {
                    console.error('verify error', e);
                    set({ authError: e.message ?? String(e) });
                    set({ isLoading: false });
                    return;
                }

                // Tout est bon, rediriger vers l'écran principal
                router.push('/(tabs)/home');
            }
        }

        set({ isLoading: false });
    },

    // Déconnexion
    logout: () => set({ user: null }),

    // Setters for auth UI state
    setAuthLoading: (loading: boolean) => set({ isLoading: loading }),
    setAuthError: (error: string | null) => set({ authError: error }),

    checkToken: async () => {
        const { tokenIsExpired } = get();
        // ICIIIIIIIIIIII Mettre le reload du token quand j'aurais le temps
        if (tokenIsExpired()) {
            console.log("TOKEN EXPIRED - REDIRECT TO LOGIN");
            router.push('/connexion/connexion');
        }
        return;
    },

    tokenIsExpired: () => {
        const { user } = get();

        if (user && user.expirationTime) {
            const now = Math.floor(Date.now() / 1000);
            return user.expirationTime < now;
        }
        return true;
    },
}))

export default useGlobalHook

