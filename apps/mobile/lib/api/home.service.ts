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

export interface APIProject {
  id: number;
  title: string;
  release: string;
  coverPath: string;
  projectType: string;
  musics: any[];
  color1: string;
  color2: string;
  rates: number | null;
  avgRate: number | null;
}

export interface FollowedArtistsReleasesResponse {
  projects: APIProject[];
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

  /**
   * Récupérer les dernières sorties des artistes suivis par un utilisateur
   * GET /user/{id}/follows/artists/releases
   */
  getFollowedArtistsReleases: async (userId: number): Promise<FollowedArtistsReleasesResponse> => {
    return await apiClient.get<FollowedArtistsReleasesResponse>(`/user/${userId}/follows/artists/releases`);
  },
};
