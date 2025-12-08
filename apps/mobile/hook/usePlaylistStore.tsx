import { create } from 'zustand';
import { Playlist } from '../lib/api/types';
import { PlaylistService } from '../lib/api';

interface PlaylistState {
  // État
  currentPlaylist: Playlist | null;
  playlists: Playlist[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchPlaylistById: (playlistId: number) => Promise<void>;
  setCurrentPlaylist: (playlist: Playlist | null) => void;
  clearError: () => void;
}

/**
 * Hook Zustand pour gérer l'état des playlists
 * Utilisation : const { currentPlaylist, fetchPlaylistById } = usePlaylistStore()
 */
const usePlaylistStore = create<PlaylistState>((set) => ({
  // État initial
  currentPlaylist: null,
  playlists: [],
  loading: false,
  error: null,

  // Récupérer une playlist par ID
  fetchPlaylistById: async (playlistId: number) => {
    set({ loading: true, error: null });
    try {
      const playlist = await PlaylistService.getPlaylistById(playlistId);
      set({ 
        currentPlaylist: playlist,
        loading: false 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors du chargement de la playlist';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Définir la playlist actuelle
  setCurrentPlaylist: (playlist: Playlist | null) => {
    set({ currentPlaylist: playlist });
  },

  // Effacer l'erreur
  clearError: () => {
    set({ error: null });
  },
}));

export default usePlaylistStore;
