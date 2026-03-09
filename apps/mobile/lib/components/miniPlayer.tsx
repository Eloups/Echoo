import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/lib/theme/provider';
import AppText from './global/appText';
import usePlayerStore from '@/hook/usePlayerStore';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoadingSpinner } from './global/BtnConnexion';

/**
 * Barre minimale du lecteur qui s'affiche au-dessus de la navigation
 */
export default function MiniPlayer() {
  const { theme } = useTheme();
  const { currentTrack, isPlaying, isLoading, togglePlayPause, showPlayerModal } = usePlayerStore();
  const insets = useSafeAreaInsets();

  const handleOpenPlayer = () => {
    if (currentTrack) {
      showPlayerModal();
    }
  };

  const handleTogglePlay = (e: any) => {
    e.stopPropagation();
    if (currentTrack) {
      togglePlayPause();
    }
  };

  return (
    <Pressable onPress={handleOpenPlayer} style={[styles.wrapper, { bottom: 60 + insets.bottom }]}>
      <View style={[styles.container, { backgroundColor: theme.colors.background2 }]}>
        <View style={styles.content}>
          {currentTrack ? (
            <>
              {/* Image de la musique */}
              <Image 
                source={currentTrack.cover} 
                style={styles.cover}
              />

              {/* Informations de la musique */}
              <View style={styles.info}>
                <AppText size="md" numberOfLines={1} style={styles.title}>
                  {currentTrack.title}
                </AppText>
                <AppText size="sm" color="text2" numberOfLines={1}>
                  {Array.isArray(currentTrack.artist) ? currentTrack.artist.join(', ') : currentTrack.artist}
                </AppText>
              </View>

              {/* Bouton Play/Pause ou spinner pendant chargement */}
              {isLoading ? (
                <View style={styles.playButton}>
                  <LoadingSpinner size={20} color={theme.colors.primary} />
                </View>
              ) : (
                <Pressable onPress={handleTogglePlay} style={styles.playButton}>
                  <Ionicons 
                    name={isPlaying ? 'pause' : 'play'} 
                    size={28} 
                    color={theme.colors.text}
                  />
                </Pressable>
              )}
            </>
          ) : (
            <View style={styles.noMusicContainer}>
              {isLoading ? (
                <LoadingSpinner size={20} color={theme.colors.primary} />
              ) : (
                <>
                  <Ionicons name="musical-notes-outline" size={24} color={theme.colors.text2} />
                  <AppText size="sm" color="text2" style={{ marginLeft: 12 }}>
                    Aucune musique en cours de lecture
                  </AppText>
                </>
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
  },
  container: {
    height: 60,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    width: '97%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: '100%',
  },
  cover: {
    width: 44,
    height: 44,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 2,
  },
  playButton: {
    padding: 8,
  },
  noMusicContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
