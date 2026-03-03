import { apiClient } from './client';

export type ProjectDetailMusic = {
  id: number;
  title: string;
  duration: number;
  release: string;
  filePath: string;
  genres: string[] | null;
  nbStreams: number;
  rates: number[] | null;
  artistName: string | null;
};

export type ProjectDetail = {
  id: number;
  title: string;
  release: string;
  coverPath: string;
  projectType: string;
  musics: ProjectDetailMusic[];
  color1: string;
  color2: string;
  rates: number[] | null;
  avgRate: number | null;
  artistName: string;
};

export type ProjectDetailResponse = {
  project: ProjectDetail;
};

export type MusicColorsResponse = {
  colors: {
    color1: string;
    color2: string;
  };
};

/**
 * Service API pour les projets (albums, EP, singles)
 * Correspond au ProjectController de l'API backend
 */
export const AlbumService = {
  /**
   * Récupérer toutes les infos d'un projet
   * GET /project/{idProject}
   */
  getProjectById: async (projectId: number): Promise<ProjectDetailResponse> => {
    return await apiClient.get<ProjectDetailResponse>(`/project/${projectId}`);
  },

  /**
   * Récupérer les couleurs dominantes d'une musique
   * GET /music/{idMusic}/colors
   */
  getMusicColors: async (musicId: number): Promise<MusicColorsResponse> => {
    return await apiClient.get<MusicColorsResponse>(`/music/${musicId}/colors`);
  },
};
