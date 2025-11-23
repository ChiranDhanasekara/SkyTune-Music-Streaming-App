// 🔐 Input Validation Utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const getEmailError = (email) => {
  if (!validateRequired(email)) {
    return 'Email is required';
  }
  if (!validateEmail(email)) {
    return 'Please enter a valid email';
  }
  return null;
};

export const getPasswordError = (password) => {
  if (!validateRequired(password)) {
    return 'Password is required';
  }
  if (!validatePassword(password)) {
    return 'Password must be at least 6 characters';
  }
  return null;
};

export const getNameError = (name) => {
  if (!validateRequired(name)) {
    return 'Name is required';
  }
  if (!validateName(name)) {
    return 'Name must be at least 2 characters';
  }
  return null;
};
