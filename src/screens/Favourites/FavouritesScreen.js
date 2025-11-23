// ⭐ Favourites Screen

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavourite } from '../../redux/favouriteSlice';
import { lightColors, darkColors, spacing, fontSize } from '../../theme/colors';
import MusicCard from '../../components/MusicCard';

const FavouritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const { favourites } = useSelector((state) => state.favourites);
  const colors = themeMode === 'light' ? lightColors : darkColors;

  const handleRemoveFavourite = (music) => {
    Alert.alert(
      'Remove from Favourites',
      `Remove "${music.title}" from favourites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            dispatch(removeFavourite(music.id));
            Alert.alert('Removed', 'Removed from favourites');
          },
        },
      ]
    );
  };

  const handleMusicPress = (music) => {
    navigation.navigate('MusicDetails', { music });
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.textGrey }]}>
        No favourites yet
      </Text>
      <Text style={[styles.emptySubtext, { color: colors.textGrey }]}>
        Add songs to your favourites from the Home screen
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MusicCard
            music={item}
            onPress={() => handleMusicPress(item)}
            onFavouritePress={() => handleRemoveFavourite(item)}
            isFavourite={true}
          />
        )}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: spacing.m,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: fontSize.subheading,
    marginBottom: spacing.s,
  },
  emptySubtext: {
    fontSize: fontSize.regular,
    textAlign: 'center',
  },
});

export default FavouritesScreen;
