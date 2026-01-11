export type ThemeName = "light" | "dark";

export type AppTheme = {
    name: ThemeName;
    colors: {
        background: string;
        background2: string;
        text: string;
        text2: string;
        primary: string;
        primaryLight: string;
        error: string;
    };
};

export const LightTheme: AppTheme = {
    name: "light",
    colors: {
        background: "#FFFFFF",
        background2: "#2B2F69",
        text: "#161616",
        text2: "#2B2F69",
        primary: "#3243DF",
        primaryLight: "#5061F7",
        error: "#DF3232",
    },
};

export const DarkTheme: AppTheme = {
    name: "dark",
    colors: {
        background: "#161616",
        background2: "#2B2F69",
        text: "#FFFFFF",
        text2: "#D8DCFF",
        primary: "#3243DF",
        primaryLight: "#5061F7",
        error: "#DF3232",
    },
};

export const themes: Record<ThemeName, AppTheme> = {
    light: LightTheme,
    dark: DarkTheme,
};
