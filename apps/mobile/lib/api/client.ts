import axios, { AxiosError, AxiosInstance } from 'axios';

// Configuration de l'URL de base de l'API depuis les variables d'environnement
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

// Configuration de l'URL du serveur de fichiers depuis les variables d'environnement
export const FILE_SERVER_URL = process.env.EXPO_PUBLIC_FILE_SERVER_URL;


// Client API centralisé avec Axios
// Gère toutes les requêtes HTTP vers l'API backend
class ApiClient {
  private client: AxiosInstance;

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
        
        if (__DEV__) {
          console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Intercepteur de réponses (pour gérer les erreurs globalement)
    this.client.interceptors.response.use(
      (response) => {
        if (__DEV__) {
          console.log(`API Response: ${response.config.url}`, response.status);
        }
        return response;
      },
      (error: AxiosError) => {
        if (__DEV__) {
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
  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  
  // Méthode PUT
  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  
  // Méthode DELETE
  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }

  
  // Récupérer l'URL complète d'une image
  getImageUrl(fileName: string): string {
    return `${FILE_SERVER_URL}/images/${fileName}`;
  }

  
  // Récupérer l'URL complète d'un stream audio
  getStreamUrl(fileName: string): string {
    return `${API_BASE_URL}/stream/${fileName}`;
  }
}

// Export d'une instance unique (singleton)
export const apiClient = new ApiClient();
