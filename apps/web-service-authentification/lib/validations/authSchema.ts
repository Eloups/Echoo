import { z } from 'zod';

// Schémas individuels exportés pour validation champ par champ
export const emailSchema = z
    .string()
    .min(1, 'L\'email est requis')
    .email('Adresse email invalide');

export const passwordSchema = z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Le mot de passe doit contenir au moins un caractère spécial (_!@#$%^&*...)');

export const usernameSchema = z
    .string()
    .min(1, 'Le nom d\'utilisateur est requis')
    .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères')
    .max(20, 'Le nom d\'utilisateur doit contenir au maximum 20 caractères')
    .regex(/^[a-zA-Z0-9_]+$/, 'Le nom d\'utilisateur ne peut contenir que des lettres, des chiffres et des underscores');
