import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/lib/theme/provider';
import AppText from './global/appText';
import usePlayerStore from '@/hook/usePlayerStore';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Barre minimale du lecteur qui s'affiche au-dessus de la navigation
 */
export default function MiniPlayer() {
  const { theme } = useTheme();
  const { currentTrack, isPlaying, togglePlayPause, showPlayerModal } = usePlayerStore();
  const insets = useSafeAreaInsets();

  if (!currentTrack) return null;

  const handleOpenPlayer = () => {
    showPlayerModal();
  };

  const handleTogglePlay = (e: any) => {
    e.stopPropagation();
    togglePlayPause();
  };

  return (
    <Pressable onPress={handleOpenPlayer} style={[styles.wrapper, { bottom: 60 + insets.bottom }]}>
      <View style={[styles.container, { backgroundColor: theme.colors.background2 }]}>
        <View style={styles.content}>
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
              {currentTrack.artist}
            </AppText>
          </View>

          {/* Bouton Play/Pause */}
          <Pressable onPress={handleTogglePlay} style={styles.playButton}>
            <Ionicons 
              name={isPlaying ? 'pause' : 'play'} 
              size={28} 
              color={theme.colors.text}
            />
          </Pressable>
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
});
