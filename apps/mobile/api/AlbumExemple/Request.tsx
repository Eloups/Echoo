import axios from 'axios'
import { Album, NewAlbum } from "./Model"


// ---- API ----
const API_BASE = 'https://api.example.com' // à remplacer par ton backend

// 🔹 GET : tous les albums
export const getAllAlbums = async (): Promise<Album[]> => {
  const response = await axios.get<Album[]>(`${API_BASE}/albums`)
  return response.data
}

// 🔹 GET : albums d’un artiste spécifique
export const getAlbumsByArtisteId = async (artistId: number): Promise<Album[]> => {
  const response = await axios.get<Album[]>(`${API_BASE}/artists/${artistId}/albums`)
  return response.data
}

// 🔹 POST : ajout d’un album
export const addAlbumExemple = async (album: NewAlbum): Promise<Album> => {
  const response = await axios.post<Album>(`${API_BASE}/albums`, album)
  return response.data
}