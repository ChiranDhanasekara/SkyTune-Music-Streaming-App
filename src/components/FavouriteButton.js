// ⭐ Favourite Button Component

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { lightColors, darkColors, spacing, borderRadius, fontSize, fontWeight } from '../theme/colors';

const FavouriteButton = ({ onPress, isFavourite, style }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const colors = themeMode === 'light' ? lightColors : darkColors;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isFavourite ? colors.skyBluePrimary : 'transparent',
          borderColor: colors.skyBluePrimary,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons
        name={isFavourite ? 'heart' : 'heart-outline'}
        size={20}
        color={isFavourite ? '#FFFFFF' : colors.skyBluePrimary}
      />
      <Text
        style={[
          styles.buttonText,
          { color: isFavourite ? '#FFFFFF' : colors.skyBluePrimary },
        ]}
      >
        {isFavourite ? 'Added to Favourites' : 'Add to Favourites'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderRadius: borderRadius.button,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: fontSize.regular,
    fontWeight: fontWeight.medium,
    marginLeft: spacing.s,
  },
});

export default FavouriteButton;
