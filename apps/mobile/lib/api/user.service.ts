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
    console.log("request = ", request);
    
    let val = await apiClient.post<any>('/users', {
      id: request.id,
      username: request.username,
      email: request.email,
      password: "",
      image_path: request.image_path,
      id_role: 1,
      id_artist: null,
    });
    console.log("val = ", val);
    return val;
  }
  // getPlaylistById: async (playlistId: number): Promise<Playlist> => {
  //   //return await apiClient.get<Playlist>(`/playlist/${playlistId}`);
  //   return await apiClient.get<Playlist>(`/playlist/${playlistId}`);
  // },

  // getAllPlaylistsByUserID: async (userId: number): Promise<Playlist> => {
  //   return await apiClient.get<Playlist>(`/playlist/library/${userId}/all`);
  // },
};
