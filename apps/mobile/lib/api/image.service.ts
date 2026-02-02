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
    AddImage: async (imageBase64: string, mimeType: string = 'image/jpeg'): Promise<any> => {
        // imageBase64 doit être la chaîne base64 pure (result.assets[0].base64)
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/images`, {
            method: 'POST',
            body: imageBase64, // juste la string base64 !
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'image/jpeg',
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Erreur upload');
        }
        return data;
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
