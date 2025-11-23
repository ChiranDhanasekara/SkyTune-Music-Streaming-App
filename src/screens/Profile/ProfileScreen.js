// 👤 Profile Screen

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { logout } from '../../redux/authSlice';
import { clearFavourites } from '../../redux/favouriteSlice';
import { clearMusicData } from '../../redux/musicSlice';
import { lightColors, darkColors, spacing, borderRadius, fontSize, fontWeight } from '../../theme/colors';
import ThemeToggleSwitch from '../../components/ThemeToggleSwitch';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const { user } = useSelector((state) => state.auth);
  const { favourites } = useSelector((state) => state.favourites);
  const colors = themeMode === 'light' ? lightColors : darkColors;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            dispatch(clearMusicData());
          },
        },
      ]
    );
  };

  const handleClearFavourites = () => {
    if (favourites.length === 0) {
      Alert.alert('Info', 'No favourites to clear');
      return;
    }

    Alert.alert(
      'Clear Favourites',
      'Remove all songs from favourites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            dispatch(clearFavourites());
            Alert.alert('Success', 'All favourites cleared');
          },
        },
      ]
    );
  };

  const ProfileCard = ({ icon, title, value, color }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
          borderColor: themeMode === 'light' ? colors.cardBorder : colors.cardOutline,
        },
      ]}
    >
      <Ionicons name={icon} size={24} color={color || colors.skyBluePrimary} />
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.textGrey }]}>{title}</Text>
        <Text
          style={[
            styles.cardValue,
            { color: themeMode === 'light' ? colors.textDark : colors.textWhite },
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={[styles.header, { backgroundColor: colors.skyBluePrimary }]}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.name}>{user?.name || 'Music Lover'}</Text>
          <Text style={styles.email}>{user?.email || 'user@skytune.com'}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <ProfileCard
            icon="heart"
            title="Favourites"
            value={`${favourites.length} Songs`}
          />
          <ProfileCard
            icon="musical-notes"
            title="Theme"
            value={themeMode === 'light' ? 'Light Mode' : 'Dark Mode'}
          />
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: themeMode === 'light' ? colors.textDark : colors.textWhite },
            ]}
          >
            Settings
          </Text>

          {/* Theme Toggle */}
          <ThemeToggleSwitch />

          {/* Clear Favourites Button */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
                borderColor: themeMode === 'light' ? colors.cardBorder : colors.cardOutline,
              },
            ]}
            onPress={handleClearFavourites}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={24} color={colors.error} />
            <Text style={[styles.actionButtonText, { color: colors.error }]}>
              Clear All Favourites
            </Text>
            <Ionicons name="chevron-forward" size={24} color={colors.error} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textGrey }]}>
            SkyTune Music Streaming
          </Text>
          <Text style={[styles.footerText, { color: colors.textGrey }]}>
            Version 1.0.0
          </Text>
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
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.l,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.m,
  },
  name: {
    color: '#FFFFFF',
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    marginBottom: 4,
  },
  email: {
    color: '#FFFFFF',
    fontSize: fontSize.regular,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.m,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
    borderRadius: borderRadius.card,
    borderWidth: 1,
    marginHorizontal: spacing.s,
  },
  cardContent: {
    marginLeft: spacing.m,
    flex: 1,
  },
  cardTitle: {
    fontSize: fontSize.small,
    marginBottom: 2,
  },
  cardValue: {
    fontSize: fontSize.regular,
    fontWeight: fontWeight.bold,
  },
  section: {
    padding: spacing.m,
  },
  sectionTitle: {
    fontSize: fontSize.subheading,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.m,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.m,
    borderRadius: borderRadius.button,
    borderWidth: 1,
    marginBottom: spacing.m,
  },
  actionButtonText: {
    flex: 1,
    fontSize: fontSize.regular,
    fontWeight: fontWeight.medium,
    marginLeft: spacing.m,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.m,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.button,
    elevation: 3,
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    marginLeft: spacing.s,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: fontSize.small,
    marginBottom: 4,
  },
});

export default ProfileScreen;
