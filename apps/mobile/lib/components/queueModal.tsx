import { Modal, View, Pressable, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/lib/theme/provider';
import AppText from '@/lib/components/global/appText';
import usePlayerStore from '@/hook/usePlayerStore';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Music } from '../types/types';
import { useState } from 'react';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type QueueModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function QueueModal({ visible, onClose }: QueueModalProps) {
  const { theme } = useTheme();
  const { queue, currentIndex, removeFromQueue, playTrack, reorderQueue } = usePlayerStore();

  const handlePlayTrack = (track: Music, index: number) => {
    // Si c'est déjà la musique en cours, ne rien faire
    if (index === currentIndex) {
      onClose();
      return;
    }
    
    // Fermer la modale immédiatement
    onClose();
    
    // Lancer la musique après un petit délai pour laisser la modale se fermer
    setTimeout(() => {
      const fileName = track.audioFile || 'default.mp3';
      playTrack(track, fileName, queue, index);
    }, 100);
  };

  const handleRemove = (index: number) => {
    removeFromQueue(index);
  };

  const handleDragEnd = ({ data }: { data: Music[] }) => {
    reorderQueue(data);
  };

  const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<Music>) => {
    const index = getIndex();
    if (index === undefined) return null;
    
    const isCurrentTrack = index === currentIndex;

    return (
      <ScaleDecorator>
        <Pressable
          style={[
            styles.trackItem,
            { backgroundColor: isCurrentTrack ? theme.colors.primary + '20' : 'transparent' },
            isActive && styles.trackItemActive
          ]}
          onPress={() => handlePlayTrack(item, index)}
          onLongPress={drag}
          disabled={isActive}
        >
          <View style={styles.trackLeft}>
            {isCurrentTrack && (
              <Ionicons name="play" size={16} color={theme.colors.primary} style={styles.playingIcon} />
            )}
            <Image source={item.cover} style={styles.trackCover} />
            <View style={styles.trackInfo}>
              <AppText
                size="md"
                numberOfLines={1}
                style={[styles.trackTitle, isCurrentTrack && { color: theme.colors.primary }]}
              >
                {item.title.length > 40 ? item.title.slice(0, 26) + "..." : item.title}
              </AppText>
              <AppText size="sm" color="text2" numberOfLines={1}>
                {Array.isArray(item.artist) ? item.artist.join(', ') : item.artist}
              </AppText>
            </View>
          </View>

          <View style={styles.trackRight}>
            <View style={styles.editActions}>
              <Pressable onPress={() => handleRemove(index)} style={styles.removeButton}>
                <MaterialIcons name="remove-circle-outline" size={24} color={theme.colors.error || '#ff4444'} />
              </Pressable>
              <Pressable onLongPress={drag} style={styles.dragButton}>
                <MaterialIcons name="drag-handle" size={24} color={theme.colors.text} />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </ScaleDecorator>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="chevron-down" size={28} color={theme.colors.text} />
            </Pressable>
            <AppText size="lg" style={styles.title}>
              Liste d'attente
            </AppText>
            <View style={styles.editButton} />
          </View>

          {/* Queue info */}
          <View style={styles.infoBar}>
            <AppText size="sm" color="text2">
              {queue.length} {queue.length > 1 ? 'morceaux' : 'morceau'}
            </AppText>
          </View>

          {/* Track list */}
          <DraggableFlatList
            data={queue}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onDragEnd={handleDragEnd}
            activationDistance={10}
            containerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  closeButton: {
    padding: 5,
    width: 80,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  editButton: {
    padding: 5,
    width: 80,
    alignItems: 'flex-end',
  },
  infoBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 110
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  trackLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playingIcon: {
    marginRight: 10,
  },
  trackCover: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 12,
  },
  editActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  removeButton: {
    padding: 5,
  },
  dragButton: {
    padding: 5,
  },
  trackItemActive: {
    opacity: 0.7
  },
  trackTitle: {
    fontWeight: '500',
  },
  trackRight: {
    marginLeft: 10,
  },
  removeButton: {
    padding: 5,
  },
});
