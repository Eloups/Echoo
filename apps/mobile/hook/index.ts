/**
 * Export centralisé de tous les hooks
 * Importez depuis ce fichier pour accéder à tous les hooks en un seul import
 * 
 * Exemple :
 * import { useArtistStore, useMusicStore } from '../hook';
 */

export { default as useArtistStore } from './useArtistStore';
export { default as useMusicStore } from './useMusicStore';
export { default as usePlaylistStore } from './usePlaylistStore';
export { default as useGlobalHook } from './globalHook';
export { default as useExempleHook } from './exempleHook';
