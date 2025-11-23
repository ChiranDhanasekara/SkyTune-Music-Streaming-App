// 🔐 Login Screen

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { loginStart, loginSuccess, loginFailure } from '../../redux/authSlice';
import { authApi } from '../../api/authApi';
import { validateEmail, validatePassword, getEmailError, getPasswordError } from '../../utils/validators';
import { lightColors, darkColors, spacing, borderRadius, fontSize, fontWeight } from '../../theme/colors';
import LoadingSpinner from '../../components/LoadingSpinner';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const { loading } = useSelector((state) => state.auth);
  const colors = themeMode === 'light' ? lightColors : darkColors;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailError = getEmailError(email);
    const passwordError = getPasswordError(password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    dispatch(loginStart());

    try {
      const response = await authApi.login(email, password);

      if (response.success) {
        dispatch(loginSuccess(response.data));
        Alert.alert('Success', 'Welcome to SkyTune!');
      } else {
        dispatch(loginFailure('Invalid credentials'));
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Logging in..." />;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="musical-notes" size={60} color={colors.skyBluePrimary} />
          <Text style={[styles.appName, { color: colors.skyBluePrimary }]}>SkyTune</Text>
          <Text style={[styles.tagline, { color: colors.textGrey }]}>
            Your Music, Your Sky
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={[styles.title, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}>
            Welcome Back
          </Text>
          <Text style={[styles.subtitle, { color: colors.textGrey }]}>
            Sign in to continue
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}>
              Email
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
                  borderColor: errors.email ? colors.error : (themeMode === 'light' ? colors.cardBorder : colors.cardOutline),
                },
              ]}
            >
              <Ionicons name="mail-outline" size={20} color={colors.textGrey} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}
                placeholder="Enter your email"
                placeholderTextColor={colors.textGrey}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}>
              Password
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
                  borderColor: errors.password ? colors.error : (themeMode === 'light' ? colors.cardBorder : colors.cardOutline),
                },
              ]}
            >
              <Ionicons name="lock-closed-outline" size={20} color={colors.textGrey} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}
                placeholder="Enter your password"
                placeholderTextColor={colors.textGrey}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={colors.textGrey}
                />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.skyBluePrimary }]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, { color: colors.textGrey }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.registerLink, { color: colors.skyBluePrimary }]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.l,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  appName: {
    fontSize: 36,
    fontWeight: fontWeight.bold,
    marginTop: spacing.m,
  },
  tagline: {
    fontSize: fontSize.regular,
    marginTop: spacing.s,
  },
  form: {
    width: '100%',
  },
  title: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.s,
  },
  subtitle: {
    fontSize: fontSize.regular,
    marginBottom: spacing.l,
  },
  inputContainer: {
    marginBottom: spacing.m,
  },
  label: {
    fontSize: fontSize.regular,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.s,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.button,
    borderWidth: 1,
    paddingHorizontal: spacing.m,
  },
  inputIcon: {
    marginRight: spacing.s,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.m,
    fontSize: fontSize.regular,
  },
  errorText: {
    color: '#FF5252',
    fontSize: fontSize.small,
    marginTop: 4,
  },
  loginButton: {
    borderRadius: borderRadius.button,
    paddingVertical: spacing.m,
    alignItems: 'center',
    marginTop: spacing.m,
    elevation: 3,
    shadowColor: '#4DBFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.l,
  },
  registerText: {
    fontSize: fontSize.regular,
  },
  registerLink: {
    fontSize: fontSize.regular,
    fontWeight: fontWeight.bold,
  },
});

export default LoginScreen;
