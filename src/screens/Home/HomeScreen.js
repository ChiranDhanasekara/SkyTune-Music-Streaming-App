// 🏠 Home Screen - Music List

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMusicStart, fetchMusicSuccess, fetchMusicFailure, setSearchQuery } from '../../redux/musicSlice';
import { addFavourite, removeFavourite } from '../../redux/favouriteSlice';
import { musicApi } from '../../api/musicApi';
import { lightColors, darkColors, spacing, fontSize, fontWeight } from '../../theme/colors';
import MusicCard from '../../components/MusicCard';
import SearchBar from '../../components/SearchBar';
import LoadingSpinner from '../../components/LoadingSpinner';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const { user } = useSelector((state) => state.auth);
  const { musicList, loading, searchQuery } = useSelector((state) => state.music);
  const { favourites } = useSelector((state) => state.favourites);
  const colors = themeMode === 'light' ? lightColors : darkColors;

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMusic();
  }, []);

  const loadMusic = async () => {
    dispatch(fetchMusicStart());
    try {
      const response = await musicApi.fetchAllMusic();
      if (response.success) {
        dispatch(fetchMusicSuccess(response.data));
      } else {
        dispatch(fetchMusicFailure(response.error));
        Alert.alert('Error', 'Failed to load music');
      }
    } catch (error) {
      dispatch(fetchMusicFailure(error.message));
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMusic();
    setRefreshing(false);
  };

  const handleSearch = (text) => {
    dispatch(setSearchQuery(text));
  };

  const filteredMusic = musicList.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isFavourite = (musicId) => {
    return favourites.some((fav) => fav.id === musicId);
  };

  const handleFavouriteToggle = (music) => {
    if (isFavourite(music.id)) {
      dispatch(removeFavourite(music.id));
    } else {
      dispatch(addFavourite(music));
    }
  };

  const handleMusicPress = (music) => {
    navigation.navigate('MusicDetails', { music });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={[styles.welcomeCard, { backgroundColor: colors.skyBluePrimary }]}>
        <Text style={styles.welcomeText}>Welcome, {user?.name || 'Music Lover'}!</Text>
        <Text style={styles.welcomeSubtext}>Discover your favorite tunes</Text>
      </View>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search for songs or artists..."
      />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.textGrey }]}>
        {searchQuery ? 'No music found' : 'No music available'}
      </Text>
    </View>
  );

  if (loading && musicList.length === 0) {
    return <LoadingSpinner message="Loading music..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filteredMusic}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MusicCard
            music={item}
            onPress={() => handleMusicPress(item)}
            onFavouritePress={() => handleFavouriteToggle(item)}
            isFavourite={isFavourite(item.id)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.skyBluePrimary]}
            tintColor={colors.skyBluePrimary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: spacing.m,
  },
  welcomeCard: {
    padding: spacing.l,
    borderRadius: 16,
    marginBottom: spacing.m,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: fontSize.subheading,
    fontWeight: fontWeight.bold,
    marginBottom: 4,
  },
  welcomeSubtext: {
    color: '#FFFFFF',
    fontSize: fontSize.regular,
    opacity: 0.9,
  },
  listContent: {
    padding: spacing.m,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: fontSize.body,
  },
});

export default HomeScreen;
