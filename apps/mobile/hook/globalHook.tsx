import { create } from 'zustand'
import { login } from '../api/Auth/Request'
import { authClient } from '@/lib/auth/auth-client'
import type { VerifyAuthResponse } from '@/lib/types/auth'
import { User } from '@/lib/types/auth'
import { router } from 'expo-router'

const API_BASE = process.env.EXPO_PUBLIC_API_BASE_URL;
const API_BASE_AUTH = process.env.EXPO_PUBLIC_API_AUTH_URL;

/**
 * Hook global pour l'état de l'application
 * Utilisé pour les données partagées entre tous les composants
 */

interface GlobalHook {
    user: User | null;


}

const useGlobalHook = create<GlobalHook>((set, get) => ({
    user: null,

    
}))

export default useGlobalHook
