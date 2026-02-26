/**
 * Types et interfaces pour l'API Artist
 */

export interface Artist {
  id: number;
  name?: string;
  nom?: string;
  isVerified?: boolean;
  description?: string;
  biographie?: string;
  imagePath?: string;
  photo?: string;
  nbLikes?: number;
  nbEcoutes?: number;
  popularMusics?: ArtistPageMusic[][];
  lastReleases?: ArtistPageMusic[][];
}

export interface ArtistPage {
  artist: Artist;
  topMusics?: Music[];
  albums?: Album[];
}

export interface ArtistPageGenre {
  id: number;
  name: string;
}

export interface ArtistPageRate {
  id: number;
  rate: number;
  createdAt: string | null;
  comment: string | null;
  user: unknown;
}

export interface ArtistPageMusic {
  id: number;
  title: string;
  duration: number;
  release: string;
  filePath: string;
  genres: ArtistPageGenre[];
  nbStreams: number;
  rates: ArtistPageRate[];
  nameArtist: string | null;
}

export interface ArtistAlbumRate {
  id: number;
  rate: number;
  createdAt: string | null;
  comment: string | null;
  user: number | null;
}

export interface ArtistAlbum {
  id: number;
  title: string;
  release: string;
  coverPath: string;
  projectType: string;
  musics: unknown[];
  color1: string;
  color2: string;
  rates: Record<string, ArtistAlbumRate> | null;
  avgRate: number | null;
  artistName: string | null;
}

export interface ArtistAlbumsResponse {
  albums: ArtistAlbum[];
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
