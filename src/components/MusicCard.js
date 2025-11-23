// 🎵 Music Card Component

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { lightColors, darkColors, spacing, borderRadius, fontSize, fontWeight } from '../theme/colors';

const MusicCard = ({ music, onPress, onFavouritePress, isFavourite }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const colors = themeMode === 'light' ? lightColors : darkColors;

  const getStatusColor = () => {
    switch (music.status) {
      case 'Trending':
        return colors.skyBluePrimary;
      case 'New':
        return colors.success;
      case 'Popular':
        return themeMode === 'light' ? colors.skyBlueLight : colors.skyBlueGlow;
      default:
        return colors.skyBluePrimary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: themeMode === 'light' ? colors.cardBorder : colors.cardOutline,
          shadowColor: colors.skyBluePrimary,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: music.coverImage }} style={styles.coverImage} />
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                { color: themeMode === 'light' ? colors.textDark : colors.textWhite },
              ]}
              numberOfLines={1}
            >
              {music.title}
            </Text>
            <Text
              style={[
                styles.artist,
                { color: themeMode === 'light' ? colors.textGrey : colors.textMedium },
              ]}
              numberOfLines={1}
            >
              {music.artist}
            </Text>
          </View>

          <TouchableOpacity onPress={onFavouritePress} style={styles.favouriteButton}>
            <Ionicons
              name={isFavourite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavourite ? colors.skyBluePrimary : colors.textGrey}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={[styles.statusChip, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{music.status}</Text>
          </View>
          <Text
            style={[
              styles.duration,
              { color: themeMode === 'light' ? colors.textGrey : colors.textMedium },
            ]}
          >
            {music.duration}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.card,
    borderWidth: 1,
    marginBottom: spacing.m,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: spacing.m,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.s,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.s,
  },
  title: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    marginBottom: 4,
  },
  artist: {
    fontSize: fontSize.label,
    fontWeight: fontWeight.regular,
  },
  favouriteButton: {
    padding: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.button,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: fontSize.small,
    fontWeight: fontWeight.medium,
  },
  duration: {
    fontSize: fontSize.label,
    fontWeight: fontWeight.medium,
  },
});

export default MusicCard;
