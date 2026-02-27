import { Project } from '../types/types';
import { apiClient } from './client';
import { Artist, ArtistPage } from './types';

/**
 * Service API pour les artistes
 * Correspond au ArtistController de l'API backend
 */
export const ArtistService = {
  /**
   * Récupérer la page d'un artiste avec ses infos et ses top musiques
   * GET /artist/{id}/page?limit={limit}
   */
  getArtistPage: async (artistId: number, limit: number = 6): Promise<ArtistPage> => {
    return await apiClient.get<ArtistPage>(`/artist/${artistId}/page`, { limit });
  },

  /**
   * Alias pour récupérer uniquement les infos de l'artiste
   */
  getArtistById: async (artistId: number): Promise<Artist> => {
    const page = await apiClient.get<ArtistPage>(`/artist/${artistId}/page`, { limit: 0 });
    return page.artist;
  },

  /**
   * Récupérer tous les artistes de la bibliothèque d'un utilisateur
   * GET /artist/library/{userId}/all
   */
  getAllArtistsByUserID: async (userId: number): Promise<any> => {
    return await apiClient.get<any>(`/artist/library/${userId}/all`);
  },

  /**
   * Récupérer tous les albums likés de l'tilisateur
   * GET /project/library/3/all
   */
  getAllProjectsByUserID: async (userId: string): Promise<Project> => {
    return await apiClient.get<Project>(`/project/library/${userId}/all`)
  }
};
