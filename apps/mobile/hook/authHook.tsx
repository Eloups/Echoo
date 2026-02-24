import { create } from 'zustand'
import { authClient } from '@/lib/auth/auth-client'
import type { JWTPayload, VerifyAuthResponse } from '@/lib/types/auth'
import { User } from '@/lib/types/auth'
import { router } from 'expo-router'
import useGlobalHook from './globalHook'
import { UserService } from '../lib/api/user.service';
import * as SecureStore from 'expo-secure-store';
import { CreateUserRequest } from '@/lib/api'

const API_BASE_AUTH = process.env.EXPO_PUBLIC_API_AUTH_URL

interface AuthHook {
  token: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, PdpB64: string | null) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  waitVerificationMail: boolean;
  authError: string | null;
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
  checkToken: () => Promise<boolean>;
  tokenIsExpired: () => boolean;  // lib/auth/service.ts
  verifyToken: (token: string) => Promise<JWTPayload | undefined>;

  sendResetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<void>;
}

export const useAuthHook = create<AuthHook>((set, get) => ({
  token: null,
  
  isLoading: false,
  authError: null,
  waitVerificationMail: false,

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
      if (error.status === 403 && error.code == 'EMAIL_NOT_VERIFIED') {
        // redirection vers un écran d'attente de vérification de l'email
        set({ waitVerificationMail: true, isLoading: false });
        // Stocker l'email pour permettre le renvoi
        await SecureStore.setItemAsync('pendingVerificationEmail', email);
        router.push('/connexion/waitingVerification');
      }

      set({ isLoading: false, authError: error.message ?? String(error) });
      return;
    }
    if (data) {
      const JWT = await authClient.token()
      console.log("JWT = ", JWT);
      // console.log("JWT =", JWT);
      
      // décoder le JWT pour avoir les infos de l'utilisateur 
      // (dont l'id pour ensouite prendre les infos supplémentaire dans l'API backend)
      if (JWT && JWT?.data && JWT?.data?.token) {
        const tokenValue = JWT.data.token;
        set({ token: tokenValue ?? null });

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
          console.log("idUser =", data.user.id);
          const userData = await UserService.getUser(data.user.id);
          console.log("ici");
          if (userData) {
            let userRender = new User(userData.user);
            userRender.expirationTime = expirationTime;

            console.log("userRender = ", userRender);
            
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
      set({ authError: error.message, isLoading: false });
      return;
    }

    if (data) {
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

      // Creation de l'utilisateur dans l'API backend avec l'ID du signUp
      try {
        let request: CreateUserRequest = {
          id: data.user.id,
          username: name,
          email: email,
          image_path: imagePath,
          id_role: 1,
        }

        //Creation de l'utilisateur dans l'API backend
        let val = await UserService.createUser(request);
        if (val.code !== 201) {
          throw new Error("Failed to create user in backend");
        }
      } catch (e: any) {
        set({ authError: e.message ?? String(e) });
        set({ isLoading: false });
        return;
      }

      // redirection vers un écran d'attente de vérification de l'email
      set({ waitVerificationMail: true, isLoading: false });
      // Stocker l'email pour permettre le renvoi
      await SecureStore.setItemAsync('pendingVerificationEmail', email);
      router.push('/connexion/waitingVerification');
    }
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

  sendResetPassword: async (email: string) => {
    set({ isLoading: true, authError: null });

    try {
      const { data, error } = await authClient.requestPasswordReset({
        email: email, // required
        redirectTo: "",
      })
      if (error) {
        throw new Error(error.message ?? String(error));
      }

    } catch (e: any) {
      set({ authError: e.message ?? String(e) });
    }
    finally {
      set({ isLoading: false });
    }
  },

  sendVerificationEmail: async (email: string) => {
    // set({ isLoading: true, waitVerificationMail: true });

    try {
      let val = await authClient.sendVerificationEmail({
        email: email,
        callbackURL: "",
      });
    } catch (e: any) { }
  },
}))

export default useAuthHook;
