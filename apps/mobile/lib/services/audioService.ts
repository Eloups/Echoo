import { Audio, AVPlaybackStatus } from 'expo-av';
import { apiClient } from '@/lib/api';

/**
 * Service de gestion de la lecture audio
 * Utilise expo-av pour streamer les musiques depuis le backend
 */
class AudioService {
  private sound: Audio.Sound | null = null;
  private currentUri: string | null = null;

  /**
   * Configure le mode audio pour la lecture
   */
  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        allowsRecordingIOS: false,
        interruptionModeIOS: 1, // DoNotMix
        interruptionModeAndroid: 1, // DoNotMix
      });
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du mode audio:', error);
    }
  }

  /**
   * Charge et joue une musique depuis le serveur de streaming
   * @param fileName Nom du fichier audio (ex: "music1.mp3")
   * @param onPlaybackStatusUpdate Callback pour les mises à jour du statut
   */
  async loadAndPlay(
    fileName: string,
    onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void
  ): Promise<void> {
    try {
      // Si une musique est déjà en cours, on la décharge
      if (this.sound) {
        await this.unload();
      }

      // Construire l'URL de streaming
      const streamUrl = apiClient.getStreamUrl(fileName);
      this.currentUri = streamUrl;

      // Créer une nouvelle instance Sound avec callback
      const callback = (status: AVPlaybackStatus) => {
        if (onPlaybackStatusUpdate) {
          onPlaybackStatusUpdate(status);
        }
      };

      const { sound } = await Audio.Sound.createAsync(
        { uri: streamUrl },
        { 
          shouldPlay: false, // Ne pas jouer immédiatement
          progressUpdateIntervalMillis: 500,
        },
        callback
      );

      this.sound = sound;
      
      // Attendre que le fichier soit chargé (iOS ne fournit pas toujours la durée immédiatement)
      await new Promise<void>((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 100; // 10 secondes maximum
        
        const checkBuffer = async () => {
          attempts++;
          const status = await sound.getStatusAsync();
          
          if (status.isLoaded) {
            // Si la durée est disponible, c'est parfait
            if (status.durationMillis && status.durationMillis > 1000) {
              resolve();
            }
            // Sur iOS, la durée peut ne pas être disponible immédiatement, on joue quand même après quelques tentatives
            else if (attempts >= 10) {
              resolve();
            }
            else {
              setTimeout(checkBuffer, 100);
            }
          } else if (attempts >= maxAttempts) {
            reject(new Error('Timeout du buffering'));
          } else {
            setTimeout(checkBuffer, 100);
          }
        };
        checkBuffer();
      });
      
      // Maintenant on peut jouer
      await sound.playAsync();
    } catch (error) {
      console.error('Erreur lors du chargement de la musique:', error);
      throw error;
    }
  }

  /**
   * Joue ou reprend la lecture
   */
  async play(): Promise<void> {
    if (this.sound) {
      await this.sound.playAsync();
    }
  }

  /**
   * Met en pause la lecture
   */
  async pause(): Promise<void> {
    if (this.sound) {
      await this.sound.pauseAsync();
    }
  }

  /**
   * Arrête et décharge la musique
   */
  async unload(): Promise<void> {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
      this.currentUri = null;
    }
  }

  /**
   * Navigue à une position spécifique (en millisecondes)
   * @param positionMillis Position en millisecondes
   */
  async seekTo(positionMillis: number): Promise<void> {
    if (this.sound) {
      try {
        // Vérifier que le son est chargé avant de seek
        const status = await this.sound.getStatusAsync();
        if (!status.isLoaded) {
          throw new Error('Le son n\'est pas chargé');
        }
        
        // Effectuer le seek
        await this.sound.setPositionAsync(positionMillis);
        
        // Attendre un peu que la nouvelle position se charge
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error: any) {
        // Ignorer l'erreur "Seeking interrupted" qui se produit lors de seek rapides multiples
        if (error.message?.includes('Seeking interrupted')) {
          return;
        }
        
        console.error('Erreur lors du seek:', error);
        throw error;
      }
    }
  }

  /**
   * Obtient le statut actuel de la lecture
   */
  async getStatus(): Promise<AVPlaybackStatus | null> {
    if (this.sound) {
      return await this.sound.getStatusAsync();
    }
    return null;
  }

  /**
   * Vérifie si une musique est chargée
   */
  isLoaded(): boolean {
    return this.sound !== null;
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
