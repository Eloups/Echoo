/**
 * Export centralisé de tous les hooks
 * Importez depuis ce fichier pour accéder à tous les hooks en un seul import
 * 
 * Exemple :
 * import { useArtistStore, useMusicStore } from '../hook';
 */

export { default as usePlaylistStore } from './usePlaylistStore';
export { default as usePlayerStore } from './usePlayerStore';
export { default as useGlobalHook } from './globalHook';
export { default as useExempleHook } from './exempleHook';
