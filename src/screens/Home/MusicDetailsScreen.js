// 🎧 Music Details Screen

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { addFavourite, removeFavourite } from '../../redux/favouriteSlice';
import { lightColors, darkColors, spacing, borderRadius, fontSize, fontWeight } from '../../theme/colors';
import PlayButton from '../../components/PlayButton';
import FavouriteButton from '../../components/FavouriteButton';
import HeaderBar from '../../components/HeaderBar';

const MusicDetailsScreen = ({ route, navigation }) => {
  const { music } = route.params;
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const { favourites } = useSelector((state) => state.favourites);
  const colors = themeMode === 'light' ? lightColors : darkColors;

  const isFavourite = favourites.some((fav) => fav.id === music.id);

  const handlePlay = () => {
    Alert.alert('Playing', `Now playing: ${music.title}`);
  };

  const handleFavouriteToggle = () => {
    if (isFavourite) {
      dispatch(removeFavourite(music.id));
      Alert.alert('Removed', 'Removed from favourites');
    } else {
      dispatch(addFavourite(music));
      Alert.alert('Added', 'Added to favourites');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar
        title="Music Details"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Album Art */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: music.coverImage }}
            style={[
              styles.coverImage,
              {
                borderColor: themeMode === 'light' ? colors.cardBorder : colors.cardOutline,
              },
            ]}
          />
        </View>

        {/* Music Info */}
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.title,
              { color: themeMode === 'light' ? colors.textDark : colors.textWhite },
            ]}
          >
            {music.title}
          </Text>
          <Text style={[styles.artist, { color: colors.textGrey }]}>
            {music.artist}
          </Text>

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={[styles.detailCard, {
              backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
              borderColor: themeMode === 'light' ? colors.cardBorder : colors.cardOutline,
            }]}>
              <Ionicons name="musical-note" size={24} color={colors.skyBluePrimary} />
              <Text style={[styles.detailLabel, { color: colors.textGrey }]}>Album</Text>
              <Text style={[styles.detailValue, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}>
                {music.album}
              </Text>
            </View>

            <View style={[styles.detailCard, {
              backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
              borderColor: themeMode === 'light' ? colors.cardBorder : colors.cardOutline,
            }]}>
              <Ionicons name="time" size={24} color={colors.skyBluePrimary} />
              <Text style={[styles.detailLabel, { color: colors.textGrey }]}>Duration</Text>
              <Text style={[styles.detailValue, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}>
                {music.duration}
              </Text>
            </View>

            <View style={[styles.detailCard, {
              backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
              borderColor: themeMode === 'light' ? colors.cardBorder : colors.cardOutline,
            }]}>
              <Ionicons name="calendar" size={24} color={colors.skyBluePrimary} />
              <Text style={[styles.detailLabel, { color: colors.textGrey }]}>Year</Text>
              <Text style={[styles.detailValue, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}>
                {music.releaseYear}
              </Text>
            </View>

            <View style={[styles.detailCard, {
              backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
              borderColor: themeMode === 'light' ? colors.cardBorder : colors.cardOutline,
            }]}>
              <Ionicons name="star" size={24} color={colors.skyBluePrimary} />
              <Text style={[styles.detailLabel, { color: colors.textGrey }]}>Rating</Text>
              <Text style={[styles.detailValue, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}>
                {music.rating?.toFixed(1) || 'N/A'}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View
            style={[
              styles.descriptionCard,
              {
                backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
                borderColor: themeMode === 'light' ? colors.cardBorder : colors.cardOutline,
              },
            ]}
          >
            <Text
              style={[
                styles.descriptionTitle,
                { color: themeMode === 'light' ? colors.textDark : colors.textWhite },
              ]}
            >
              About
            </Text>
            <Text style={[styles.description, { color: colors.textGrey }]}>
              {music.description}
            </Text>
          </View>

          {/* Action Buttons */}
          <PlayButton onPress={handlePlay} style={styles.button} />
          <FavouriteButton
            onPress={handleFavouriteToggle}
            isFavourite={isFavourite}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: spacing.l,
  },
  coverImage: {
    width: 280,
    height: 280,
    borderRadius: borderRadius.image,
    borderWidth: 2,
  },
  infoContainer: {
    paddingHorizontal: spacing.l,
  },
  title: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.s,
  },
  artist: {
    fontSize: fontSize.body,
    textAlign: 'center',
    marginBottom: spacing.l,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.l,
  },
  detailCard: {
    width: '48%',
    alignItems: 'center',
    padding: spacing.m,
    borderRadius: borderRadius.card,
    borderWidth: 1,
    marginBottom: spacing.m,
  },
  detailLabel: {
    fontSize: fontSize.small,
    marginTop: spacing.s,
  },
  detailValue: {
    fontSize: fontSize.regular,
    fontWeight: fontWeight.bold,
    marginTop: 4,
  },
  descriptionCard: {
    padding: spacing.m,
    borderRadius: borderRadius.card,
    borderWidth: 1,
    marginBottom: spacing.l,
  },
  descriptionTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.s,
  },
  description: {
    fontSize: fontSize.regular,
    lineHeight: 22,
  },
  button: {
    marginBottom: spacing.m,
  },
});

export default MusicDetailsScreen;
