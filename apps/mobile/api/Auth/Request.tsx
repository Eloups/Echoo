import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LoginResponse } from './Model';

// ici il faut mettre l'adresse IP locale du pc 
// allé dans le terminal et tapez ipconfig (windows) 
// et prendre l'adresse IPv4
const AUTH_URL = process.env.EXPO_PUBLIC_API_AUTH_URL;


export const login = async (email: string, password: string): Promise<string> => {
        const res = await fetch(`${AUTH_URL}/api/auth/sign-in/email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
        })

        const data: LoginResponse = await res.json()
        await AsyncStorage.setItem("token", data.token)

        return data.token
}