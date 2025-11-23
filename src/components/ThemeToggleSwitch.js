// 🎭 Theme Toggle Switch Component

import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { lightColors, darkColors, spacing, fontSize, fontWeight } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const ThemeToggleSwitch = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const colors = themeMode === 'light' ? lightColors : darkColors;
  const isDark = themeMode === 'dark';

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: themeMode === 'light' ? colors.cardBorder : colors.cardOutline,
        },
      ]}
    >
      <View style={styles.leftContent}>
        <Ionicons
          name={isDark ? 'moon' : 'sunny'}
          size={24}
          color={colors.skyBluePrimary}
          style={styles.icon}
        />
        <View>
          <Text
            style={[
              styles.title,
              { color: themeMode === 'light' ? colors.textDark : colors.textWhite },
            ]}
          >
            Dark Mode
          </Text>
          <Text style={[styles.subtitle, { color: colors.textGrey }]}>
            {isDark ? 'Enabled' : 'Disabled'}
          </Text>
        </View>
      </View>
      <Switch
        value={isDark}
        onValueChange={handleToggle}
        trackColor={{ false: '#D1D1D1', true: colors.skyBlueLight }}
        thumbColor={isDark ? colors.skyBluePrimary : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.m,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.m,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.m,
  },
  title: {
    fontSize: fontSize.regular,
    fontWeight: fontWeight.bold,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: fontSize.small,
  },
});

export default ThemeToggleSwitch;
