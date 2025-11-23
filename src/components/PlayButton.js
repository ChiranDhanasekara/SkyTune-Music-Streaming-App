// 🎮 Play Button Component

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { lightColors, darkColors, spacing, borderRadius, fontSize, fontWeight } from '../theme/colors';

const PlayButton = ({ onPress, style }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const colors = themeMode === 'light' ? lightColors : darkColors;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.skyBluePrimary,
          borderColor: themeMode === 'dark' ? colors.skyBlueGlow : 'transparent',
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="play" size={24} color="#FFFFFF" />
      <Text style={styles.buttonText}>Play Now</Text>
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
    elevation: 4,
    shadowColor: '#4DBFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    marginLeft: spacing.s,
  },
});

export default PlayButton;
