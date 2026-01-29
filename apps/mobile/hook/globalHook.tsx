import { create } from 'zustand'
import { User } from '@/lib/types/auth'
import { ImageService } from '../lib/api/image.service';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE_URL;
const API_BASE_AUTH = process.env.EXPO_PUBLIC_API_AUTH_URL;

/**
 * Hook global pour l'état de l'application
 * Utilisé pour les données partagées entre tous les composants
 */

interface GlobalHook {
    user: User | null;

    AddImage: (imagePath: string) => Promise<void>;
    GetImage: (imagePath: string) => Promise<string | null>;
}

const useGlobalHook = create<GlobalHook>((set, get) => ({
    user: null,

    AddImage: async (imagePath: string) => {
        try {
            const retour = await ImageService.AddImage(imagePath);
            console.log("retour hook:", retour);
        } catch (e) {
            console.error('Erreur lors de l\'upload de l\'image:', e);
        }
    },

    GetImage: async (imagePath: string) => {
        try {
            const res = await ImageService.GetImage(imagePath);
            // Selon la réponse, adapter le retour (ex: url, base64, etc.)
            return res;
        } catch (e) {
            console.error('Erreur lors de la récupération de l\'image:', e);
            return null;
        }
    },
}))

export default useGlobalHook
