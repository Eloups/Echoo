import { create } from 'zustand'
import { login } from '../api/Auth/Request'

const API_BASE = 'https://api.example.com'

/**
 * Hook global pour l'état de l'application
 * Utilisé pour les données partagées entre tous les composants
 */
interface GlobalHook {

    login: (email: string, password: string) => boolean
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

    login: (email: string, password: string) => {
        console.log("login in global hook");
        login(email, password);
        return true
    }
  // Définir l'état de connexion
  setConnected: (connected: boolean) => set({ isConnected: connected }),

  // Définir l'ID utilisateur
  setUserId: (id: number | null) => set({ userId: id }),

  // Déconnexion
  logout: () => set({ isConnected: false, userId: null }),
}))

export default useGlobalHook

