import { create } from 'zustand';
import { Music } from '@/lib/types/types';
import { audioService } from '@/lib/api/audioService';
import { AVPlaybackStatus } from 'expo-av';
import useAuthHook from './authHook';

interface PlayerState {
  // État
  currentTrack: Music | null;
  currentFileName: string | null;
  isPlaying: boolean;
  progress: number; // En secondes
  duration: number; // En secondes
  queue: Music[];
  currentIndex: number;
  isPlayerModalVisible: boolean;
  isLoading: boolean;
  isAdvancingToNext: boolean;

  // Actions
  playTrack: (track: Music, fileName: string, queue?: Music[], startIndex?: number) => Promise<void>;
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
  reorderQueue: (newQueue: Music[]) => void;
  addToQueue: (track: Music) => void;
  playNext: (track: Music) => void;
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
  isAdvancingToNext: false,

  // Jouer une piste
  playTrack: async (track: Music, fileName: string, queue: Music[] = [], startIndex: number = 0) => {
    set({ isLoading: true });

    try {
      const userId = useAuthHook.getState().userId ?? '';
      const normalizedQueue = Array.isArray(queue) && queue.length > 0 ? queue : [track];
      const safeStartIndex = Math.max(0, Math.min(startIndex, normalizedQueue.length - 1));

      // Initialiser le mode audio si nécessaire
      await audioService.initialize();

      // Préparer les métadonnées pour le lecteur système
      const metadata = {
        title: track.title,
        artist: Array.isArray(track.artist) ? track.artist.join(', ') : track.artist,
        imageUri: typeof track.cover === 'object' && 'uri' in track.cover ? track.cover.uri : undefined,
      };



      // Charger et jouer la musique avec métadonnées
      await audioService.loadAndPlay(
        fileName,
        userId,
        track.id,
        (status) => {
          get().updatePlaybackStatus(status);
        },
        metadata
      );

      const trackDuration = track.duration || 0;

      set({
        currentTrack: track,
        currentFileName: fileName,
        isPlaying: true,
        progress: 0,
        duration: trackDuration,
        queue: normalizedQueue,
        currentIndex: safeStartIndex,
        isPlayerModalVisible: false,
        isLoading: false,
        isAdvancingToNext: false,
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
      const userId = useAuthHook.getState().userId ?? '';
      const nextIndex = (currentIndex + 1) % queue.length;
      const nextTrack = queue[nextIndex];
      const fileName = nextTrack.audioFile || 'default.mp3';
      set({ isLoading: true });

      // TODO: Récupérer l'ID utilisateur depuis un contexte d'authentification

      // Charger et jouer la nouvelle piste
      try {
        await audioService.loadAndPlay(fileName, userId, nextTrack.id, (status) => {
          get().updatePlaybackStatus(status);
        });


        set({
          currentTrack: nextTrack,
          currentFileName: fileName,
          currentIndex: nextIndex,
          progress: 0,
          duration: nextTrack.duration || 0,
          isPlaying: true,
          isLoading: false,
          isAdvancingToNext: false,
        });
      } catch (error) {
        console.error('Erreur lors du changement de piste:', error);
        set({ isLoading: false, isAdvancingToNext: false });
      }
    } else {
      set({ isAdvancingToNext: false, isPlaying: false });
    }
  },

  // Piste précédente
  previousTrack: async () => {
    const { queue, currentIndex, progress } = get();
    const userId = useAuthHook.getState().userId ?? '';
    // Si on est à plus de 3 secondes, on recommence la chanson
    if (progress > 3) {
      await audioService.seekTo(0);
      set({ progress: 0 });
    } else if (queue.length > 0) {
      const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
      const prevTrack = queue[prevIndex];
      const fileName = prevTrack.audioFile || 'default.mp3';
      set({ isLoading: true });

      // TODO: Récupérer l'ID utilisateur depuis un contexte d'authentification

      // Charger et jouer la nouvelle piste
      try {
        await audioService.loadAndPlay(fileName, userId, prevTrack.id, (status) => {
          get().updatePlaybackStatus(status);
        });

        set({
          currentTrack: prevTrack,
          currentFileName: fileName,
          currentIndex: prevIndex,
          progress: 0,
          duration: prevTrack.duration || 0,
          isPlaying: true,
          isLoading: false,
          isAdvancingToNext: false,
        });
      } catch (error) {
        console.error('Erreur lors du changement de piste:', error);
        set({ isLoading: false, isAdvancingToNext: false });
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

  // Mettre à jour l'état de chargement
  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  // Mise à jour du statut de lecture depuis expo-av
  updatePlaybackStatus: (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      const progressSeconds = Math.floor((status.positionMillis || 0) / 1000);
      const durationSeconds = Math.floor((status.durationMillis || 0) / 1000);

      const currentState = get();

      // Prioriser la vraie durée du fichier audio, puis fallback sur la durée backend.
      const finalDuration = durationSeconds > 0 ? durationSeconds : currentState.duration;

      // Fallback robuste: considérer la piste terminée même si didJustFinish n'est pas fourni.
      const didReachRealEnd =
        !!status.durationMillis &&
        !!status.positionMillis &&
        status.durationMillis > 0 &&
        status.positionMillis >= status.durationMillis - 300 &&
        !status.isPlaying;
      const didFinish = !!status.didJustFinish || didReachRealEnd;

      set({
        progress: progressSeconds,
        duration: finalDuration,
        isPlaying: status.isPlaying,
      });

      // Si la musique est terminée, passer à la suivante
      if (didFinish && !currentState.isAdvancingToNext) {
        set({ isAdvancingToNext: true });
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
  reorderQueue: (newQueue: Music[]) => {
    const { currentTrack } = get();
    // Trouver le nouvel index de la musique en cours
    const newCurrentIndex = newQueue.findIndex(track => track.id === currentTrack?.id);
    set({ queue: newQueue, currentIndex: newCurrentIndex >= 0 ? newCurrentIndex : 0 });
  },

  // Ajouter une musique à la fin de la queue
  addToQueue: (track: Music) => {
    const { queue } = get();
    const newQueue = [...queue, track];
    set({ queue: newQueue });
  },

  // Ajouter une musique juste après la musique en cours
  playNext: (track: Music) => {
    const { queue, currentIndex } = get();
    const newQueue = [...queue];
    // Insérer après l'index actuel
    newQueue.splice(currentIndex + 1, 0, track);
    set({ queue: newQueue });
  },
}));

export default usePlayerStore;
