// 📝 Register Screen

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
import { registerStart, registerSuccess, registerFailure } from '../../redux/authSlice';
import { authApi } from '../../api/authApi';
import { getNameError, getEmailError, getPasswordError } from '../../utils/validators';
import { lightColors, darkColors, spacing, borderRadius, fontSize, fontWeight } from '../../theme/colors';
import LoadingSpinner from '../../components/LoadingSpinner';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const { loading } = useSelector((state) => state.auth);
  const colors = themeMode === 'light' ? lightColors : darkColors;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const nameError = getNameError(name);
    const emailError = getEmailError(email);
    const passwordError = getPasswordError(password);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    dispatch(registerStart());

    try {
      const response = await authApi.register(name, email, password);

      if (response.success) {
        dispatch(registerSuccess(response.data));
        Alert.alert('Success', 'Account created successfully!');
      } else {
        dispatch(registerFailure('Registration failed'));
        Alert.alert('Error', 'Could not create account. Please try again.');
      }
    } catch (error) {
      dispatch(registerFailure(error.message));
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Creating account..." />;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="musical-notes" size={50} color={colors.skyBluePrimary} />
          <Text style={[styles.appName, { color: colors.skyBluePrimary }]}>SkyTune</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={[styles.title, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: colors.textGrey }]}>
            Sign up to get started
          </Text>

          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}>
              Full Name
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
                  borderColor: errors.name ? colors.error : (themeMode === 'light' ? colors.cardBorder : colors.cardOutline),
                },
              ]}
            >
              <Ionicons name="person-outline" size={20} color={colors.textGrey} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}
                placeholder="Enter your name"
                placeholderTextColor={colors.textGrey}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
              />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

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

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}>
              Confirm Password
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: themeMode === 'light' ? colors.backgroundSecondary : colors.cardBackground,
                  borderColor: errors.confirmPassword ? colors.error : (themeMode === 'light' ? colors.cardBorder : colors.cardOutline),
                },
              ]}
            >
              <Ionicons name="lock-closed-outline" size={20} color={colors.textGrey} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: themeMode === 'light' ? colors.textDark : colors.textWhite }]}
                placeholder="Confirm your password"
                placeholderTextColor={colors.textGrey}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                }}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={colors.textGrey}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: colors.skyBluePrimary }]}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textGrey }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.loginLink, { color: colors.skyBluePrimary }]}>
                Login
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
    marginBottom: spacing.l,
  },
  appName: {
    fontSize: 32,
    fontWeight: fontWeight.bold,
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
    marginBottom: spacing.m,
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
  registerButton: {
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
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.l,
  },
  loginText: {
    fontSize: fontSize.regular,
  },
  loginLink: {
    fontSize: fontSize.regular,
    fontWeight: fontWeight.bold,
  },
});

export default RegisterScreen;
