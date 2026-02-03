import { apiClient } from './client';
import { CreateUserRequest } from './types';

// @ts-ignore
import { File } from 'expo-file-system';


/**
 * Service API pour les utilisateurs
 * Correspond au UserController de l'API backend
 */
export const ImageService = {
    /**
     * Crée un utilisateur
     * Post 
     */
    AddImage: async (imageBase64: string, mimeType: string = 'image/jpeg'): Promise<{ filename: string }> => {
        // Nettoyer le base64 si nécessaire
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        
        // Décoder le base64 en binaire pour React Native
        // On va utiliser fetch avec le body binaire brut
        const binaryString = atob(cleanBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': mimeType, // Le backend vérifie ce header pour l'extension
            },
            body: bytes,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Erreur upload');
        }

        // Le backend retourne { "fileName": "..." }
        const data = await response.json();
        return { filename: data.fileName };
    },

    /**
     * récupérer les info d'un utilisateur
     * Get
     */
    GetImage: async (imagePath: string): Promise<any> => {
        let retour = await apiClient.get<any>('/images' + `/${imagePath}`);
        return retour;
    }
};
