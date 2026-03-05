import { createAudioPlayer, AudioPlayer, AudioSource, setAudioModeAsync } from 'expo-audio';
import { apiClient } from '@/lib/api';
import useAuthHook from '@/hook/authHook';

/**
 * Service de gestion de la lecture audio
 * Utilise expo-audio pour streamer les musiques depuis le backend avec support arrière-plan
 */
class AudioService {
  private player: AudioPlayer | null = null;
  private currentUri: string | null = null;
  private statusUpdateCallback: ((status: any) => void) | null = null;
  private statusInterval: number | null = null;
  private hasEmittedDidJustFinish = false;

  /**
   * Initialise le lecteur audio et configure le mode audio pour l'arrière-plan
   */
  async initialize() {
    try {
      if (!this.player) {
        // Créer le player avec createAudioPlayer
        this.player = createAudioPlayer();
        
        // Configurer le mode audio pour l'arrière-plan
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: true,
          interruptionMode: 'doNotMix',
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du lecteur audio:', error);
    }
  }

  /**
   * Démarre l'intervalle pour les mises à jour de statut
   */
  private startStatusUpdates() {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
    }

    this.statusInterval = setInterval(() => {
      if (this.player && this.statusUpdateCallback) {
        const durationSeconds = this.player.duration || 0;
        const positionSeconds = this.player.currentTime || 0;
        const nearEndThreshold = 0.25;
        const isNearOrAtEnd =
          durationSeconds > 0 && positionSeconds >= Math.max(0, durationSeconds - nearEndThreshold);
        const didJustFinish = isNearOrAtEnd && !this.player.playing && !this.hasEmittedDidJustFinish;

        if (didJustFinish) {
          this.hasEmittedDidJustFinish = true;
        }

        if (this.player.playing && !isNearOrAtEnd) {
          this.hasEmittedDidJustFinish = false;
        }

        const status = {
          isLoaded: this.player.isLoaded,
          isPlaying: this.player.playing,
          positionMillis: positionSeconds * 1000,
          durationMillis: durationSeconds * 1000,
          isBuffering: this.player.isBuffering,
          didJustFinish,
        };
        this.statusUpdateCallback(status);
      }
    }, 500) as unknown as number;
  }

  /**
   * Arrête l'intervalle pour les mises à jour de statut
   */
  private stopStatusUpdates() {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
      this.statusInterval = null;
    }
  }

  /**
   * Charge et joue une musique depuis le serveur de streaming
   * @param fileName Nom du fichier audio (ex: "music1.mp3")
   * @param userId ID de l'utilisateur
   * @param musicId ID de la musique
   * @param onPlaybackStatusUpdate Callback pour les mises à jour du statut
   * @param metadata Métadonnées de la musique (titre, artiste, image)
   */
  async loadAndPlay(
    fileName: string,
    userId: string,
    musicId: number,
    onPlaybackStatusUpdate?: (status: any) => void,
    metadata?: { title: string; artist: string; imageUri?: string }
  ): Promise<void> {
    try {
      // Initialiser si nécessaire
      if (!this.player) {
        await this.initialize();
      }

      // Arrêter les anciennes mises à jour
      this.stopStatusUpdates();
      this.hasEmittedDidJustFinish = false;

      // Construire l'URL de streaming et enregistrer dans l'historique
      const streamUrl = await apiClient.getStreamUrl(fileName, userId, musicId);
      this.currentUri = streamUrl;

      // Stocker le callback
      if (onPlaybackStatusUpdate) {
        this.statusUpdateCallback = onPlaybackStatusUpdate;
      }

      // Créer la source audio
      const token = useAuthHook.getState().token;
      const audioSource: AudioSource = token
        ? ({
            uri: streamUrl,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          } as any)
        : {
            uri: streamUrl,
          };

      // Charger et jouer
      if (this.player) {
        this.player.replace(audioSource);
        
        // Attendre que le fichier soit chargé
        await new Promise<void>((resolve) => {
          const checkLoaded = () => {
            if (this.player && this.player.isLoaded) {
              resolve();
            } else {
              setTimeout(checkLoaded, 100);
            }
          };
          checkLoaded();
        });

        // Configurer les métadonnées et contrôles système si fournies
        if (metadata) {
          try {
            // Vérifier que la méthode existe avant de l'appeler
            if (typeof this.player.setActiveForLockScreen === 'function') {
              this.player.setActiveForLockScreen(true, {
                title: metadata.title,
                artist: metadata.artist,
                artworkUrl: metadata.imageUri,
              });
            }
          } catch (error) {
            console.log('Lock screen controls not available:', error);
          }
        }

        this.player.play();

        // Démarrer les mises à jour de statut
        this.startStatusUpdates();
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la musique:', error);
      this.stopStatusUpdates();
      throw error;
    }
  }

  /**
   * Joue ou reprend la lecture
   */
  async play(): Promise<void> {
    if (this.player) {
      this.player.play();
    }
  }

  /**
   * Met en pause la lecture
   */
  async pause(): Promise<void> {
    if (this.player) {
      this.player.pause();
    }
  }

  /**
   * Arrête et décharge la musique
   */
  async unload(): Promise<void> {
    this.stopStatusUpdates();
    if (this.player) {
      this.player.remove();
      this.currentUri = null;
      this.statusUpdateCallback = null;
    }
  }

  /**
   * Navigue à une position spécifique (en millisecondes)
   * @param positionMillis Position en millisecondes
   */
  async seekTo(positionMillis: number): Promise<void> {
    if (this.player && this.player.isLoaded) {
      try {
        // Convertir en secondes pour expo-audio
        const positionSeconds = positionMillis / 1000;
        await this.player.seekTo(positionSeconds);
        if (positionSeconds < (this.player.duration || 0)) {
          this.hasEmittedDidJustFinish = false;
        }
        
        // Attendre un peu que la nouvelle position se charge
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error: any) {
        console.error('Erreur lors du seek:', error);
        throw error;
      }
    }
  }

  /**
   * Obtient le statut actuel de la lecture
   */
  async getStatus(): Promise<any | null> {
    if (this.player) {
      return {
        isLoaded: this.player.isLoaded,
        isPlaying: this.player.playing,
        positionMillis: this.player.currentTime * 1000,
        durationMillis: this.player.duration * 1000,
        isBuffering: this.player.isBuffering,
      };
    }
    return null;
  }

  /**
   * Vérifie si une musique est chargée
   */
  isLoaded(): boolean {
    return this.player !== null && this.player.isLoaded;
  }

  /**
   * Obtient l'URI actuellement chargée
   */
  getCurrentUri(): string | null {
    return this.currentUri;
  }
}

// Export d'une instance unique (singleton)
export const audioService = new AudioService();
