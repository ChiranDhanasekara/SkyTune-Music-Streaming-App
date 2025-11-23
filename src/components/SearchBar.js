// 🔍 Search Bar Component

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { lightColors, darkColors, spacing, borderRadius, fontSize } from '../theme/colors';

const SearchBar = ({ value, onChangeText, placeholder = 'Search music...' }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const colors = themeMode === 'light' ? lightColors : darkColors;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
          borderColor: themeMode === 'light' ? colors.cardBorder : colors.cardOutline,
        },
      ]}
    >
      <Ionicons
        name="search"
        size={20}
        color={colors.textGrey}
        style={styles.icon}
      />
      <TextInput
        style={[
          styles.input,
          { color: themeMode === 'light' ? colors.textDark : colors.textWhite },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textGrey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.button,
    borderWidth: 1,
    marginBottom: spacing.m,
  },
  icon: {
    marginRight: spacing.s,
  },
  input: {
    flex: 1,
    fontSize: fontSize.regular,
    padding: 0,
  },
});

export default SearchBar;
