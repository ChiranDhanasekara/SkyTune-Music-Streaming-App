// 🔄 Loading Spinner Component

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { lightColors, darkColors, spacing, fontSize } from '../theme/colors';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const colors = themeMode === 'light' ? lightColors : darkColors;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.skyBluePrimary} />
      <Text style={[styles.message, { color: colors.textGrey }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  message: {
    marginTop: spacing.m,
    fontSize: fontSize.regular,
  },
});

export default LoadingSpinner;
