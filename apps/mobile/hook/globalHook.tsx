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

    AddImage: (imageB64: string) => Promise<string>;
    GetImage: (imagePath: string) => Promise<string | null>;
}

const useGlobalHook = create<GlobalHook>((set, get) => ({
    user: null,

    AddImage: async (imageB64: string) => {
        try {
            const retour = await ImageService.AddImage(imageB64);
            if (retour && retour.fileName){return retour.fileName ;}
            return "";
        } catch (e) {
            console.error('Erreur lors de l\'upload de l\'image:', e);
            return "";
        }
    },

    GetImage: async (imagePath: string) => {
        try {
            // Le retour c'est le fichier binaire
            const res = await ImageService.GetImage(imagePath);
            return res;
        } catch (e) {
            console.error('Erreur lors de la récupération de l\'image:', e);
            return null;
        }
    },
}))

export default useGlobalHook
