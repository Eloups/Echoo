import { create } from 'zustand';
import { BaseInfos } from '@/lib/types/types';
import { audioService } from '@/lib/services/audioService';
import { AVPlaybackStatus } from 'expo-av';

interface PlayerState {
  // État
  currentTrack: BaseInfos | null;
  currentFileName: string | null;
  isPlaying: boolean;
  progress: number; // En secondes
  duration: number; // En secondes
  queue: BaseInfos[];
  currentIndex: number;
  isPlayerModalVisible: boolean;
  isLoading: boolean;
  
  // Actions
  playTrack: (track: BaseInfos, fileName: string, queue?: BaseInfos[], startIndex?: number) => Promise<void>;
  pause: () => Promise<void>;
  play: () => Promise<void>;
  togglePlayPause: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  seekTo: (time: number) => Promise<void>;
  setProgress: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  updatePlaybackStatus: (status: AVPlaybackStatus) => void;
  showPlayerModal: () => void;
  hidePlayerModal: () => void;
  togglePlayerModal: () => void;
  removeFromQueue: (index: number) => void;
  reorderQueue: (newQueue: BaseInfos[]) => void;
  addToQueue: (track: BaseInfos) => void;
}

/**
 * Store pour gérer l'état du lecteur de musique
 */
const usePlayerStore = create<PlayerState>((set, get) => ({
  // État initial
  currentTrack: null,
  currentFileName: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  queue: [],
  currentIndex: 0,
  isPlayerModalVisible: false,
  isLoading: false,

  // Jouer une piste
  playTrack: async (track: BaseInfos, fileName: string, queue: BaseInfos[] = [], startIndex: number = 0) => {
    set({ isLoading: true });
    
    try {
      // Initialiser le mode audio si nécessaire
      await audioService.initialize();
      
      // Charger et jouer la musique
      await audioService.loadAndPlay(fileName, (status) => {
        get().updatePlaybackStatus(status);
      });
      
      set({
        currentTrack: track,
        currentFileName: fileName,
        isPlaying: true,
        progress: 0,
        duration: track.duration || 0, // Utiliser la durée du backend si disponible
        queue: queue.length > 0 ? queue : [track],
        currentIndex: startIndex,
        isPlayerModalVisible: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Erreur lors de la lecture:', error);
      set({ isLoading: false, isPlaying: false });
    }
  },

  // Pause
  pause: async () => {
    await audioService.pause();
    set({ isPlaying: false });
  },

  // Play
  play: async () => {
    await audioService.play();
    set({ isPlaying: true });
  },

  // Toggle play/pause
  togglePlayPause: async () => {
    const { isPlaying } = get();
    if (isPlaying) {
      await get().pause();
    } else {
      await get().play();
    }
  },

  // Piste suivante
  nextTrack: async () => {
    const { queue, currentIndex } = get();
    if (queue.length > 0) {
      const nextIndex = (currentIndex + 1) % queue.length;
      const nextTrack = queue[nextIndex];
      const fileName = nextTrack.audioFile || 'default.mp3';
      
      // Charger et jouer la nouvelle piste
      try {
        await audioService.loadAndPlay(fileName, (status) => {
          get().updatePlaybackStatus(status);
        });
        
        set({
          currentTrack: nextTrack,
          currentFileName: fileName,
          currentIndex: nextIndex,
          progress: 0,
          isPlaying: true,
        });
      } catch (error) {
        console.error('Erreur lors du changement de piste:', error);
      }
    }
  },

  // Piste précédente
  previousTrack: async () => {
    const { queue, currentIndex, progress } = get();
    // Si on est à plus de 3 secondes, on recommence la chanson
    if (progress > 3) {
      await audioService.seekTo(0);
      set({ progress: 0 });
    } else if (queue.length > 0) {
      const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
      const prevTrack = queue[prevIndex];
      const fileName = prevTrack.audioFile || 'default.mp3';
      
      // Charger et jouer la nouvelle piste
      try {
        await audioService.loadAndPlay(fileName, (status) => {
          get().updatePlaybackStatus(status);
        });
        
        set({
          currentTrack: prevTrack,
          currentFileName: fileName,
          currentIndex: prevIndex,
          progress: 0,
          isPlaying: true,
        });
      } catch (error) {
        console.error('Erreur lors du changement de piste:', error);
      }
    }
  },

  // Chercher à un moment précis
  seekTo: async (time: number) => {
    await audioService.seekTo(time * 1000); // Convertir en millisecondes
    set({ progress: time });
  },

  // Mettre à jour la progression
  setProgress: (time: number) => {
    set({ progress: time });
  },

  // Mettre à jour la durée
  setDuration: (duration: number) => {
    set({ duration });
  },

  // Mise à jour du statut de lecture depuis expo-av
  updatePlaybackStatus: (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      const progressSeconds = Math.floor((status.positionMillis || 0) / 1000);
      const durationSeconds = Math.floor((status.durationMillis || 0) / 1000);
      
      const currentState = get();
      
      // Ne mettre à jour la durée que si elle est disponible et qu'on n'a pas déjà une durée du backend
      const finalDuration = currentState.duration > 0 ? currentState.duration : durationSeconds;
      
      set({
        progress: progressSeconds,
        duration: finalDuration,
        isPlaying: status.isPlaying,
      });

      // Si la musique est terminée, passer à la suivante
      if (status.didJustFinish) {
        get().nextTrack();
      }
    }
  },

  // Afficher la modale du lecteur
  showPlayerModal: () => {
    set({ isPlayerModalVisible: true });
  },

  // Masquer la modale du lecteur
  hidePlayerModal: () => {
    set({ isPlayerModalVisible: false });
  },

  // Toggle la visibilité de la modale
  togglePlayerModal: () => {
    set((state) => ({ isPlayerModalVisible: !state.isPlayerModalVisible }));
  },

  // Supprimer une musique de la queue
  removeFromQueue: (index: number) => {
    const { queue, currentIndex } = get();
    const newQueue = queue.filter((_, i) => i !== index);
    
    // Ajuster currentIndex si nécessaire
    let newCurrentIndex = currentIndex;
    if (index < currentIndex) {
      newCurrentIndex = currentIndex - 1;
    } else if (index === currentIndex && newQueue.length > 0) {
      // Si on supprime la musique en cours, on ne change pas l'index
      // mais il faudra passer à la suivante quand elle se termine
      newCurrentIndex = Math.min(currentIndex, newQueue.length - 1);
    }
    
    set({ queue: newQueue, currentIndex: newCurrentIndex });
  },

  // Réorganiser la queue
  reorderQueue: (newQueue: BaseInfos[]) => {
    const { currentTrack } = get();
    // Trouver le nouvel index de la musique en cours
    const newCurrentIndex = newQueue.findIndex(track => track.id === currentTrack?.id);
    set({ queue: newQueue, currentIndex: newCurrentIndex >= 0 ? newCurrentIndex : 0 });
  },

  // Ajouter une musique à la fin de la queue
  addToQueue: (track: BaseInfos) => {
    const { queue } = get();
    set({ queue: [...queue, track] });
  },
}));

export default usePlayerStore;
