import { create } from 'zustand'
import { getAllAlbums } from '../api/AlbumExemple/Request'

const API_BASE = 'https://api.example.com'

interface GlobalHook {

}

const useGlobalHook = create<GlobalHook>((set) => ({


}))
export default useGlobalHook

