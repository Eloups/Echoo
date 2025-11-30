import { create } from 'zustand'
import { login } from '../api/Auth/Request'

const API_BASE = 'https://api.example.com'

interface GlobalHook {

    login: (email: string, password: string) => boolean
}

const useGlobalHook = create<GlobalHook>((set) => ({

    login: (email: string, password: string) => {
        console.log("login in global hook");
        login(email, password);
        return true
    }
}))
export default useGlobalHook

