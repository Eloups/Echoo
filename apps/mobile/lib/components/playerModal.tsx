import { Modal, View, Image, Pressable, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import usePlayerStore from '@/hook/usePlayerStore';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import QueueModal from './queueModal';
import { UserService } from '../api/user.service';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Modale du lecteur de musique complet en plein écran
 */
export default function PlayerModal() {
  const { theme } = useTheme();
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seekTo,
    isPlayerModalVisible,
    hidePlayerModal,
    isLoading,
  } = usePlayerStore();

  const userId = "3";

  const [localProgress, setLocalProgress] = useState(progress);
  const [isSeeking, setIsSeeking] = useState(false);
  const [queueVisible, setQueueVisible] = useState(false);
  const seekTimeoutRef = useState<NodeJS.Timeout | null>(null)[0];
  const [isMusicLike, setIsMusicLike] = useState<boolean>(false);

  // Synchroniser le slider avec la progression réelle
  useEffect(() => {
    if (!isSeeking) {
      setLocalProgress(progress);
    }
  }, [progress, isSeeking]);

  if (!currentTrack) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSliderChange = (value: number) => {
    setLocalProgress(value);
    if (!isSeeking) {
      setIsSeeking(true);
    }
  };

  const handleSliderComplete = async (value: number) => {
    try {
      // Empêcher la synchronisation pendant un court moment
      setLocalProgress(value);
      
      // Effectuer le seek
      await seekTo(value);
      
      // Attendre un peu avant de réactiver la synchronisation
      if (seekTimeoutRef) {
        clearTimeout(seekTimeoutRef);
      }
      
      const timeout = setTimeout(() => {
        setIsSeeking(false);
      }, 300);
      
      // Stocker le timeout pour le cleanup
      Object.assign(seekTimeoutRef, { current: timeout });
    } catch (error) {
      // Gérer l'erreur silencieusement si le seek échoue
      setIsSeeking(false);
    }
  };

  // Like d'une musique
  const handleMusicLike = () => {
    setIsMusicLike(!isMusicLike);
  }

  useEffect(() => {
    if (isMusicLike === true) {
      console.log(currentTrack);
      console.log(userId);
      UserService.postLikeMusic(userId, currentTrack.id);
    }
  }, [isMusicLike]);


  return (
    <Modal
      visible={isPlayerModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={hidePlayerModal}
    >
      <LinearGradient
        colors={[currentTrack.color1 || '#04131D', currentTrack.color2 || '#082840', theme.colors.background]}
        style={styles.container}
        locations={[0, 0.4, 1]}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Bouton retour */}
          <View style={styles.header}>
            <Pressable onPress={hidePlayerModal} style={styles.backButton}>
              <Ionicons name="chevron-down" size={32} color={theme.colors.text} />
            </Pressable>
          </View>

          {/* Cover de la musique */}
          <View style={styles.coverContainer}>
            <Image
              source={currentTrack.cover}
              style={styles.cover}
            />
            {/* Indicateur de chargement pendant le seek */}
            {isLoading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <AppText size="sm" color="text2" style={{ marginTop: 10 }}>
                  Chargement...
                </AppText>
              </View>
            )}
            {/* Titre de l'album sur l'image */}
            <View style={styles.albumTitleOverlay}>
            </View>
          </View>

          {/* Informations de la musique */}
          <View style={styles.infoContainer}>
            <View style={styles.titleRow}>
              <View style={{ flex: 1 }}>
                <AppText size="xl" style={styles.trackTitle}>
                  {currentTrack.title}
                </AppText>
                <AppText size="md" color="text2" style={styles.artist}>
                  {currentTrack.artist}
                </AppText>
              </View>
              <View style={styles.actionsRow}>
                <Pressable style={styles.actionButton}>
                  <MaterialIcons name="playlist-add" size={28} color={theme.colors.text} />
                </Pressable>
                <Pressable onPress={handleMusicLike} style={styles.actionButton}>
                  <Ionicons name={isMusicLike ? "heart" : "heart-outline"} size={26} color={isMusicLike ? '#DB1151' : theme.colors.text} />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Barre de progression */}
          <View style={styles.progressContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              value={localProgress}
              onValueChange={handleSliderChange}
              onSlidingComplete={handleSliderComplete}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
              thumbTintColor={theme.colors.primary}
            />
            <View style={styles.timeContainer}>
              <AppText size="sm" color="text2">
                {formatTime(localProgress)}
              </AppText>
              <AppText size="sm" color="text2">
                -{formatTime(duration - localProgress)}
              </AppText>
            </View>
          </View>

          {/* Contrôles de lecture */}
          <View style={styles.controlsContainer}>
            <Pressable onPress={previousTrack} style={styles.controlButton}>
              <Ionicons name="play-skip-back" size={36} color={theme.colors.text} />
            </Pressable>

            <Pressable onPress={togglePlayPause} style={styles.playButton}>
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight]}
                style={styles.playButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={40}
                  color="white"
                />
              </LinearGradient>
            </Pressable>

            <Pressable onPress={nextTrack} style={styles.controlButton}>
              <Ionicons name="play-skip-forward" size={36} color={theme.colors.text} />
            </Pressable>
          </View>

          {/* Boutons de partage et options */}
          <View style={styles.bottomControls}>
            {/* <Pressable style={styles.bottomButton}>
              <FontAwesome5 name="bluetooth-b" size={20} color={theme.colors.primary} />
            </Pressable>

            <Pressable style={styles.bottomButton}>
              <Ionicons name="create-outline" size={24} color={theme.colors.text} />
            </Pressable> */}

            <Pressable style={styles.bottomButton} onPress={() => setQueueVisible(true)}>
              <Entypo name="menu" size={24} color={theme.colors.text} />
            </Pressable>
          </View>

          
        </ScrollView>
      </LinearGradient>

      {/* Modale de la liste d'attente */}
      <QueueModal visible={queueVisible} onClose={() => setQueueVisible(false)} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 50,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    marginTop: 10,
  },
  coverContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    position: 'relative',
  },
  cover: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.75,
    borderRadius: 12,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumTitleOverlay: {
    position: 'absolute',
    bottom: 20,
    left: '12.5%',
    right: '12.5%',
    paddingLeft: 20,
  },
  albumTitle: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  trackTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artist: {
    marginTop: 5,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    padding: 5,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 15,
  },
  controlButton: {
    padding: 10,
  },
  playButton: {
    marginHorizontal: 10,
  },
  playButtonGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  bottomButton: {
    padding: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  tabActive: {
    backgroundColor: 'rgba(50, 67, 223, 0.8)',
  },
  tabText: {
    textAlign: 'center',
  },
});
