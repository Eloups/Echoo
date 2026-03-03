import { Artist, Music, Project } from '../types/types';
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

export interface SearchList {
  artists: Artist[],
  projects: Project[],
  musics: Music[]
}

export interface APIArtist {
  id: number;
  name: string;
  isVerified: boolean;
  description: string;
  imagePath: string;
  network: any[];
  projects: any[];
  featuredMusic: any[];
}

export interface MonthArtistsResponse {
  artists: APIArtist[];
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
    return await apiClient.get<LastListenedMusicsResponse>(`/user/${userId}/listened/musics`);
  },

  /**
   * Récupérer les dernières sorties des artistes suivis par un utilisateur
   * GET /user/{id}/follows/artists/releases
   */
  getFollowedArtistsReleases: async (userId: number): Promise<FollowedArtistsReleasesResponse> => {
    return await apiClient.get<FollowedArtistsReleasesResponse>(`/user/${userId}/follows/artists/releases`);
  },

  /**
   * Récupérer les artistes les plus écoutés du mois
   * GET /artist/listened/month
   */
  getMonthArtists: async (): Promise<MonthArtistsResponse> => {
    return await apiClient.get<MonthArtistsResponse>('/artist/listened/month');
  },

  /***
   * Rechercher une musique ou un artiste dans la base de données
   * GET /artist/search/(ce que je veux chercher)
   */
  searchInDB: async (search: string): Promise<SearchList> => {
    return await apiClient.get<SearchList>(`/artist/search/${search}`);
  }
};
