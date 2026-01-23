/**
 * Types et interfaces pour l'API Artist
 */

export interface Artist {
  id: number;
  nom: string;
  biographie?: string;
  photo?: string;
  nbEcoutes?: number;
}

export interface ArtistPage {
  artist: Artist;
  topMusics?: Music[];
  albums?: Album[];
}

export interface Music {
  id: number;
  titre: string;
  duree?: number;
  dateRelease?: string;
  nbEcoutes?: number;
  fichierAudio?: string;
  artisteId: number;
  artisteNom?: string;
  albumId?: number;
  albumTitre?: string;
  cover?: string;
}

export interface Album {
  id: number;
  titre: string;
  dateRelease?: string;
  cover?: string;
  artisteId: number;
  artisteNom?: string;
}

export interface Playlist {
  playlist: {
    id: number;
    nom: string;
    description?: string;
    cover?: string;
    dateCreation?: string;
    utilisateurId?: number;
    musics?: Music[];
  }
}

export interface CreateUserRequest {
  id: string;
  username: string;
  email: string;
  // password: string; // toujours ""
  image_path: string; // Par default ""
  id_role: number; //Default 1
  // id_artist: number | null;
}
