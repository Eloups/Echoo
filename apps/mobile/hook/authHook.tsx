import { create } from 'zustand'
import { authClient } from '@/lib/auth/auth-client'
import type { JWTPayload, VerifyAuthResponse } from '@/lib/types/auth'
import { User } from '@/lib/types/auth'
import { router } from 'expo-router'
import useGlobalHook from './globalHook'
import { UserService } from '../lib/api/user.service';
import { CreateUserRequest } from '../lib/api/types';


const API_BASE_AUTH = process.env.EXPO_PUBLIC_API_AUTH_URL

interface AuthHook {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, PdpB64: string | null) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  authError: string | null;
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
  checkToken: () => Promise<boolean>;
  tokenIsExpired: () => boolean;  // lib/auth/service.ts
  verifyToken: (token: string) => Promise<JWTPayload | undefined>;

  sendVerificationEmail: (email: string) => Promise<void>;

}

export const useAuthHook = create<AuthHook>((set, get) => ({
  isLoading: false,
  authError: null,

  setAuthLoading: (loading: boolean) => set({ isLoading: loading }),
  setAuthError: (error: string | null) => set({ authError: error }),

  logout: async () => {
    try {
      let val = await authClient.signOut();
    } catch (e) {
      console.error('Logout failed:', e);
    }

    useGlobalHook.setState({ user: null })
    router.push('/connexion/connexion');
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

        let decodedToken: JWTPayload | undefined;
        try {
          const { verifyToken } = get();
          decodedToken = await verifyToken(tokenValue);
          if (decodedToken) {
            useGlobalHook.setState({ user: User.fromJWTPayload(decodedToken) })
          }
        } catch (e: any) {
          set({ authError: e.message ?? String(e) });
          set({ isLoading: false });
          return;
        }

        try {
          //Recupération des infos utilisateur dans l'API backend
          let expirationTime = decodedToken?.exp;
          const userData = await UserService.getUser(data.user.id);
          if (userData) {
            let userRender = new User(userData.user);
            userRender.expirationTime = expirationTime;

            useGlobalHook.setState({ user: userRender });
          }
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

  register: async (name: string, email: string, password: string, PdpB64: string | null) => {
    set({ isLoading: true, authError: null });

    // Creation de l'utilisateur dans le service d'authentification
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
      // Génération du JWT

      const JWT = await authClient.token()

      // Décodage du JWT pour avoir les infos de l'utilisateur 
      // (dont l'id pour ensuite le crée dans l'API backend)
      if (JWT && JWT.data && JWT.data.token) {

        const tokenValue = JWT.data.token;

        let decodedToken: JWTPayload | undefined;
        try {
          const { verifyToken } = get();

          decodedToken = await verifyToken(tokenValue);
          if (decodedToken) {
            useGlobalHook.setState({ user: User.fromJWTPayload(decodedToken) })
          }
        } catch (e: any) {
          set({ authError: e.message ?? String(e) });
          set({ isLoading: false });
          return;
        }

        // ajout de la photo de profil si elle est présente 
        let imagePath = "";
        try {
          if (PdpB64) {
            // Utilise le hook global pour sauvegarder l'image et récupérer le nom du fichier
            const { AddImage } = useGlobalHook.getState();

            const fileName: string = await AddImage(PdpB64);
            if (fileName) {
              imagePath = fileName;
            }
          }
        } catch (e: any) {
          set({ authError: e.message ?? String(e) });
          set({ isLoading: false });
          return;
        }

        // Creation de l'utilisateur dans l'API backend
        try {
          let request: CreateUserRequest = {
            id: data.user.id,
            username: name,
            email: email,
            image_path: imagePath,
            id_role: 1,
          }

          //Creation de l'utilisateur dans l'API backend (avec le même token)
          let val = await UserService.createUser(request);

          if (val.code == 201) {
            let expirationTime = decodedToken?.exp;
            const userData = await UserService.getUser(data.user.id);
            if (userData) {
              let userRender = new User(userData.user);
              userRender.expirationTime = expirationTime;

              useGlobalHook.setState({ user: userRender });
            }
          }
        } catch (e: any) {
          set({ authError: e.message ?? String(e) });
          set({ isLoading: false });
          return;
        }
        // console.log("user =", useGlobalHook.getState().user);

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
      return true;
    }
    return false;
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
  },

  sendVerificationEmail: async (email: string) => {
    let retour = await authClient.requestPasswordReset({
      email: email, // required
      redirectTo: "",
    })

    // console.log("sendVerificationEmail retour =", retour);
  },
}))

export default useAuthHook;
