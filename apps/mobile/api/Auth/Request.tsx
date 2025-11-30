import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LoginResponse } from './Model';

// ici il faut mettre l'adresse IP locale du pc 
// allé dans le terminal et tapez ipconfig (windows) 
// et prendre l'adresse IPv4
const AUTH_URL = "http://192.168.1.89:3000"


export const login = async (email: string, password: string): Promise<string> => {
    console.log("login in request");    
    
    const res = await fetch(`${AUTH_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
        })

        const data: LoginResponse = await res.json()
        await AsyncStorage.setItem("token", data.token)

        return data.token
}