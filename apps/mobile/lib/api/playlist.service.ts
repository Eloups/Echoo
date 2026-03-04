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

  getAllPlaylistsByUserID: async (userId: string): Promise<Playlist> => {
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

  /**
   * Mettre à jour une playlist
   * PATCH /playlist/{id}
   */
  updatePlaylist: async (playlistId: number, data: {
    title?: string;
    isPublic?: boolean;
    description?: string;
    cover_path?: string;
  }): Promise<any> => {
    return await apiClient.patch(`/playlist/${playlistId}`, data);
  },

  /**
   * Supprimer une playlist
   * DELETE /playlist/{id}
   */
  deletePlaylist: async (playlistId: number): Promise<any> => {
    return await apiClient.delete(`/playlist/${playlistId}`);
  },

  /**
   * Ajouter une musique à une playlist
   * POST /playlist/add/music
   */
  addMusicToPlaylist: async (playlistId: number, musicId: number): Promise<any> => {
    return await apiClient.post('/playlist/add/music', {
      id_playlist: playlistId,
      id_music: musicId
    });
  },

  /**
   * Supprimer une musique d'une playlist
   * DELETE /playlist/delete/music
   */
  deleteMusicFromPlaylist: async (playlistId: number, musicId: number): Promise<any> => {
    return await apiClient.delete('/playlist/delete/music', {
      id_playlist: playlistId,
      id_music: musicId
    });
  },
};
