import { create } from 'zustand'
import { getAllAlbums } from '../api/AlbumExemple/Request'

const API_BASE = 'https://api.example.com'

// Iterface a alimenter avec le store (elle permet de typer les variables et fonctions du store)
interface AppState {
    exempleVar: number
    exempleVar2: number


    setExempleVar: (value: number) => void
    IncrementExempleVar2: () => void
}

// Creation du store (là où on initialise et définit les fonctions et variables)
const useAppStore = create<AppState>((set) => ({
    // #region vraiables
    exempleVar: 0,
    exempleVar2: 0,

    // #endregion

    // #region fonctions
    setExempleVar: (value: number) => set({ exempleVar: value }),
    IncrementExempleVar2: () => set((state) => ({ exempleVar2: state.exempleVar2 + 1 })),

    addAlbumExemple: (titre: string, artisteId: number) => {

    },
    getAlbumsByArtistId: (artisteId: number) => {

    },
    getAllAlbums: async () => {
        try {
            const val = await getAllAlbums() 
            set({ exempleVar: 1 }) 
            set({ exempleVar: 2 }) 
            return val          
        } catch (error) {
            console.error('Erreur dans getAllAlbums:', error)
            return []
        }
    },

    // #endregion

}))
export default useAppStore

