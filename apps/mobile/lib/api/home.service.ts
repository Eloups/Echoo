import { apiClient } from './client';

/**
 * Types spécifiques pour le service Home
 */
export interface APIMusic {
  id: number;
  title: string;
  duration: number;
  release: string;
  filePath: string;
  genres: string[];
  nbStreams: number;
  rates: number | null;
  nameArtist: string | null;
}

export interface LastListenedMusicsResponse {
  musics: APIMusic[];
}

/**
 * Service API pour la page d'accueil
 * Gère les données spécifiques à l'écran Home
 */
export const HomeService = {
  /**
   * Récupérer les dernières musiques écoutées par un utilisateur
   * GET /user/{id}/listened/musics
   */
  getLastListenedMusics: async (userId: number): Promise<LastListenedMusicsResponse> => {
    return await apiClient.get<LastListenedMusicsResponse>(`/user/${userId}/lastListened/musics`);
  },
};
