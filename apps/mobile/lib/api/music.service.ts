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

  /**
   * Récupérer le chemin de la cover d'une musique
   * GET /music/{id}/coverPath
   */
  getMusicCoverPath: async (musicId: number): Promise<{ cover_path: string }> => {
    return await apiClient.get<{ cover_path: string }>(`/music/${musicId}/coverPath`);
  },

  /**
   * Ajouter une musique à l'historique d'écoute de l'utilisateur
   * POST /user/listened/musics/add
   */
  addListenedMusic: async (userId: string, musicId: number): Promise<void> => {
    return await apiClient.post('/user/listened/musics/add', {
      id_user: userId.toString(),
      id_music: musicId
    });
  },

  /**
   * Vérifier si une musique est déjà liké par l'utilisateur
   * GET /music/user/isLike
   */
  getIsMusicIsLike: async (userId: string, musicId: number): Promise<{ isLike: boolean }> => {
    return await apiClient.post('/music/user/isLike', {
      id_user: userId.toString(),
      id_music: musicId
    });
  },
};
