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
};
