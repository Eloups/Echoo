import { Playlist } from '../types/types';
import { apiClient } from './client';
import { CreateUserRequest } from './types';

/**
 * Service API pour les utilisateurs
 * Correspond au UserController de l'API backend
 */
export const UserService = {
  /**
   * Crée un utilisateur
   * Post 
   */
  createUser: async (request: CreateUserRequest): Promise<any> => {
    let retour = await apiClient.post<any>('/users', {
      id: request.id,
      username: request.username,
      email: request.email,
      password: "",
      image_path: request.image_path,
      id_role: 1,
      id_artist: null,
    });

    return retour;
  },

  /**
   * récupérer les info d'un utilisateur
   * Get
   */
  getUser: async (idUser: string): Promise<any> => {
    let retour = await apiClient.get<any>('/users' + `/${idUser}`);
    return retour;
  },

  /**
   * Récupérer la playliste de titres likés
   */
  getLikedPlaylist: async (idUser: string): Promise<{ playlist: Playlist }> => {
    return await apiClient.get<{ playlist: Playlist }>(`/users/${idUser}/liked/playlist`);
  }
};
