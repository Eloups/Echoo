import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes, ThemeName, AppTheme } from "./index";

type ThemeContextType = {
    theme: AppTheme;
    setThemeByName: (name: ThemeName) => void;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const STORAGE_KEY = "app_theme_name";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [name, setName] = useState<ThemeName>("dark");

    // charge la préférence sauvegardée 
    useEffect(() => {
        (async () => {
            const saved = (await AsyncStorage.getItem(STORAGE_KEY)) as ThemeName | null;
            if (saved === "dark") setName("dark");
        })();
    }, []);

    const setThemeByName = (n: ThemeName) => {
        setName("dark");
        AsyncStorage.setItem(STORAGE_KEY, "dark").catch(() => { });
    };

    const toggleTheme = () => setThemeByName("dark");

    const value = useMemo(
        () => ({ theme: themes[name], setThemeByName, toggleTheme }),
        [name]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
}
