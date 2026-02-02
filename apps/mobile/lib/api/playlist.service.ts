import { apiClient } from './client';
import { Playlist } from './types';

/**
 * Service API pour les playlists
 * Correspond au PlaylistController de l'API backend
 */
export const PlaylistService = {
  /**
   * Récupérer une playlist par son ID
   * GET /playlist/{id}
   */
  getPlaylistById: async (playlistId: number): Promise<Playlist> => {
    return await apiClient.get<Playlist>(`/playlist/${playlistId}`);
  },

  getAllPlaylistsByUserID: async (userId: number): Promise<Playlist> => {
    return await apiClient.get<Playlist>(`/playlist/library/${userId}/all`);
  },

  /**
   * Créer une nouvelle playlist
   * POST /playlist/add
   */
  createPlaylist: async (data: {
    id_library: string;
    title: string;
    isPublic: boolean;
    description: string;
    cover_path: string;
    musics: number[];
  }): Promise<any> => {
    return await apiClient.post('/playlist/add', data);
  },
};
