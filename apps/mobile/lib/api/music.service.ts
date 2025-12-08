import { apiClient } from './client';
import { Music } from './types';

/**
 * Service API pour les musiques
 * Correspond au MusicController de l'API backend
 */
export const MusicService = {
  /**
   * Récupérer toutes les musiques d'un artiste
   * GET /musics/artist/{id}
   */
  getMusicsByArtist: async (artistId: number): Promise<Music[]> => {
    return await apiClient.get<Music[]>(`/musics/artist/${artistId}`);
  },
};
