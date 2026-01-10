import { create } from 'zustand'
import { authClient } from '@/lib/auth/auth-client'
import type { JWTPayload, VerifyAuthResponse } from '@/lib/types/auth'
import { User } from '@/lib/types/auth'
import { router } from 'expo-router'
import useGlobalHook from './globalHook'


const API_BASE_AUTH = 'http://192.168.1.57:3333'

interface AuthHook {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  authError: string | null;
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
  checkToken: () => void;
  tokenIsExpired: () => boolean;  // lib/auth/service.ts
  verifyToken: (token: string) => Promise<JWTPayload | undefined>;
}

export const useAuthHook = create<AuthHook>((set, get) => ({
  isLoading: false,
  authError: null,

  setAuthLoading: (loading: boolean) => set({ isLoading: loading }),
  setAuthError: (error: string | null) => set({ authError: error }),

  logout: () => {
    // Clear global user state
    useGlobalHook.setState({ user: null })
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, authError: null });

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    })

    if (error) {
      // ICIIIIIII a voir pour mettre un message d'erreur a la main pour l'avoir en français 
      // et pour que ce ne soit pas dirrectement l'erreur du serveur
      set({ isLoading: false, authError: error.message ?? String(error) });
      return;
    }

    if (data) {
      const JWT = await authClient.token()

      // décoder le JWT pour avoir les infos de l'utilisateur 
      // (dont l'id pour ensouite prendre les infos supplémentaire dans l'API backend)
      if (JWT && JWT?.data && JWT?.data?.token) {
        const tokenValue = JWT.data.token;

        try {
          const { verifyToken } = get();

          const decodedToken = await verifyToken(tokenValue);
          if (decodedToken) {
            useGlobalHook.setState({ user: User.fromJWTPayload(decodedToken) })
          } 
        } catch (e: any) {
          set({ authError: e.message ?? String(e) });
          set({ isLoading: false });
          return;
        }

        try {
          // ICIIIII 
          // Prendre les infos supplémentaire de l'utilisateur dans l'API backend 
          // (role etc..)
        } catch (e: any) {
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
      name,
      email,
      password,
    });

    if (error) {
      // ICIIIIIII a voir pour mettre un message d'erreur a la main pour l'avoir en français 
      // et pour que ce ne soit pas dirrectement l'erreur du serveur
      set({ isLoading: false, authError: error.message ?? String(error) });
      return;
    }

    if (data) {
      const JWT = await authClient.token()

      // décoder le JWT pour avoir les infos de l'utilisateur 
      // (dont l'id pour ensouite le crée dans l'API backend)
      if (JWT && JWT.data && JWT.data.token) {
        const tokenValue = JWT.data.token;

        try {
          const { verifyToken } = get();

          const decodedToken = await verifyToken(tokenValue);
          if (decodedToken) {
            useGlobalHook.setState({ user: User.fromJWTPayload(decodedToken) })
          } 
        } catch (e: any) {
          set({ authError: e.message ?? String(e) });
          set({ isLoading: false });
          return;
        }

        try {
          // ICIIIII 
          // Crée l'utilisateur dans le back & prendre les infos supplémentaire de l'utilisateur dans l'API backend 
          // (role etc..)
        } catch (e: any) {
          set({ authError: e.message ?? String(e) });
          set({ isLoading: false });
          return;
        }

        router.push('/(tabs)/home');
      }
    }

    // Tout est bon, rediriger vers l'écran principal
    set({ isLoading: false });
  },

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
    // Prefer global user if available
    const user = useGlobalHook.getState().user;

    if (user && user.expirationTime) {
      const now = Math.floor(Date.now() / 1000);
      return user.expirationTime < now;
    }
    return true;
  },

  verifyToken: async (token: string) => {
    const res = await fetch(`${API_BASE_AUTH}/api/auth/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) });
    const json = await res.json() as VerifyAuthResponse;
    if (!res.ok || json.status !== 'SUCCESS') throw new Error(json.message ?? 'verify failed');
    return json.decoded;
  }

}))

export default useAuthHook;
