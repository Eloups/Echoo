import axios, { AxiosError, AxiosInstance } from 'axios';
import { MusicService } from './music.service';
import { useAuthHook } from '../../hook/authHook';
import { config } from 'better-auth';

// Configuration de l'URL de base de l'API depuis les variables d'environnement
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
// Client API centralisé avec Axios
// Gère toutes les requêtes HTTP vers l'API backend
class ApiClient {
  private client: AxiosInstance;

  private isExpectedUserBootstrap404(error: AxiosError): boolean {
    const status = error.response?.status;
    const url = error.config?.url ?? '';
    return status === 404 && /^\/users\/[^/]+$/.test(url);
  }

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000, // 10 secondes
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Intercepteur de requêtes (pour ajouter des tokens, logs, etc.)
    this.client.interceptors.request.use(
      (config) => {
        // Ajouter le token d'authentification si disponible
        const token = useAuthHook.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Intercepteur de réponses (pour gérer les erreurs globalement)
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (__DEV__ && !this.isExpectedUserBootstrap404(error)) {
          console.error(`API Error: ${error.config?.url}`, error.response?.status);
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  // Gestion centralisée des erreurs
  private handleError(error: AxiosError): Error {
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      const status = error.response.status;
      if (!this.isExpectedUserBootstrap404(error)) {
        console.error('Backend error response:', error.response.data);
      }

      const message = error.response.data || error.message;

      switch (status) {
        case 400:
          return new Error(`Requête invalide: ${message}`);
        case 401:
          return new Error('Non authentifié');
        case 403:
          return new Error('Accès refusé');
        case 404:
          return new Error('Ressource non trouvée');
        case 500:
          return new Error('Erreur serveur');
        default:
          return new Error(`Erreur ${status}: ${message}`);
      }
    } else if (error.request) {
      // La requête a été envoyée mais pas de réponse
      return new Error('Aucune réponse du serveur. Vérifiez votre connexion.');
    } else {
      // Erreur lors de la configuration de la requête
      return new Error(`Erreur: ${error.message}`);
    }
  }


  // Méthode GET
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }


  // Méthode POST
  async post<T>(url: string, data?: any, isFile: boolean = false): Promise<T> {
    const config = isFile ? {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    } : {};

    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  // Méthode DELETE
  async delete<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.delete<T>(url, { data });
    return response.data;
  }

  // Méthode PUT
  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }


  // Méthode PATCH
  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.patch<T>(url, data);
    return response.data;
  }




  // Récupérer l'URL complète d'une image
  getImageUrl(fileName: string): string {
    return `${API_BASE_URL}/images/${fileName}`;
  }


  // Récupérer l'URL complète d'un stream audio et enregistrer dans l'historique
  async getStreamUrl(fileName: string, userId: string, musicId: number): Promise<string> {
    // Enregistrer la musique dans l'historique d'écoute (fire-and-forget)
    MusicService.addListenedMusic(userId, musicId).catch(error => {
      console.error("Erreur lors de l'enregistrement de la musique dans l'historique:", error);
    });

    return `${API_BASE_URL}/stream/${fileName}`;
  }
}

// Export d'une instance unique (singleton)
export const apiClient = new ApiClient();
