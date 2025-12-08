import { create } from 'zustand';
import { Music } from '../lib/api/types';
import { MusicService } from '../lib/api';

interface MusicState {
  // État
  currentMusic: Music | null;
  musics: Music[];
  musicsByArtist: Record<number, Music[]>; // Cache des musiques par artiste
  loading: boolean;
  error: string | null;

  // Actions
  fetchMusicsByArtist: (artistId: number) => Promise<void>;
  setCurrentMusic: (music: Music | null) => void;
  clearError: () => void;
}

/**
 * Hook Zustand pour gérer l'état des musiques
 * Utilisation : const { musics, fetchMusicsByArtist } = useMusicStore()
 */
const useMusicStore = create<MusicState>((set, get) => ({
  // État initial
  currentMusic: null,
  musics: [],
  musicsByArtist: {},
  loading: false,
  error: null,

  // Récupérer les musiques d'un artiste
  fetchMusicsByArtist: async (artistId: number) => {
    // Vérifier le cache d'abord
    const cached = get().musicsByArtist[artistId];
    if (cached) {
      set({ musics: cached });
      return;
    }

    set({ loading: true, error: null });
    try {
      const musics = await MusicService.getMusicsByArtist(artistId);
      set({ 
        musics,
        musicsByArtist: { ...get().musicsByArtist, [artistId]: musics },
        loading: false 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du chargement des musiques';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Définir la musique actuelle
  setCurrentMusic: (music: Music | null) => {
    set({ currentMusic: music });
  },

  // Effacer l'erreur
  clearError: () => {
    set({ error: null });
  },
}));

export default useMusicStore;
