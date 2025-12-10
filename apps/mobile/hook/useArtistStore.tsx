import { create } from 'zustand';
import { Artist, ArtistPage } from '../lib/api/types';
import { ArtistService } from '../lib/api';

interface ArtistState {
  // État
  currentArtist: Artist | null;
  currentArtistPage: ArtistPage | null;
  artists: Artist[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchArtistPage: (artistId: number, limit?: number) => Promise<void>;
  fetchArtistById: (artistId: number) => Promise<void>;
  setCurrentArtist: (artist: Artist | null) => void;
  clearError: () => void;
}

/**
 * Hook Zustand pour gérer l'état des artistes
 * Utilisation : const { currentArtist, fetchArtistPage } = useArtistStore()
 */
const useArtistStore = create<ArtistState>((set) => ({
  // État initial
  currentArtist: null,
  currentArtistPage: null,
  artists: [],
  loading: false,
  error: null,

  // Récupérer la page complète d'un artiste
  fetchArtistPage: async (artistId: number, limit: number = 6) => {
    set({ loading: true, error: null });
    try {
      const artistPage = await ArtistService.getArtistPage(artistId, limit);
      set({ 
        currentArtistPage: artistPage,
        currentArtist: artistPage.artist,
        loading: false 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du chargement de l\'artiste';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Récupérer uniquement les infos d'un artiste
  fetchArtistById: async (artistId: number) => {
    set({ loading: true, error: null });
    try {
      const artist = await ArtistService.getArtistById(artistId);
      set({ 
        currentArtist: artist,
        loading: false 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du chargement de l\'artiste';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Définir l'artiste actuel
  setCurrentArtist: (artist: Artist | null) => {
    set({ currentArtist: artist });
  },

  // Effacer l'erreur
  clearError: () => {
    set({ error: null });
  },
}));

export default useArtistStore;
