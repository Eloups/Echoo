import { create } from 'zustand'
import { getAllAlbums } from '../api/AlbumExemple/Request'

const API_BASE = 'https://api.example.com'

interface GlobalHook {
    error : string;
    setError : (message: string) => void;
}

const useGlobalHook = create<GlobalHook>((set) => ({
    // #region vraiables
    error: "",
    // #endregion
    
    // #region fonctions
    setError: (message: string) => set({ error: message }),

    // #endregion

}))
export default useGlobalHook

