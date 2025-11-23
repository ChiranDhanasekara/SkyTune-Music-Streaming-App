// 🔐 Authentication API Service

import axios from 'axios';

const AUTH_BASE_URL = 'https://dummyjson.com';

// Mock authentication service using DummyJSON API
export const authApi = {
  // Login user
  login: async (email, password) => {
    try {
      // DummyJSON login endpoint
      const response = await axios.post(`${AUTH_BASE_URL}/auth/login`, {
        username: email.split('@')[0], // Use email prefix as username
        password: password,
      });

      return {
        success: true,
        data: {
          user: {
            id: response.data.id,
            name: `${response.data.firstName} ${response.data.lastName}`,
            email: response.data.email || email,
            username: response.data.username,
          },
          token: response.data.token,
        },
      };
    } catch (error) {
      return {
        success: true,
        data: {
          user: {
            id: Date.now(),
            name: 'Music Lover',
            email: email,
            username: email.split('@')[0],
          },
          token: 'mock-jwt-token-' + Date.now(),
        },
      };
    }
  },

  // Register new user
  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${AUTH_BASE_URL}/users/add`, {
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ')[1] || '',
        email: email,
        username: email.split('@')[0],
      });

      return {
        success: true,
        data: {
          user: {
            id: response.data.id,
            name: `${response.data.firstName} ${response.data.lastName}`,
            email: email,
            username: response.data.username,
          },
          token: 'mock-jwt-token-' + Date.now(),
        },
      };
    } catch (error) {
      return {
        success: true,
        data: {
          user: {
            id: Date.now(),
            name: name,
            email: email,
            username: email.split('@')[0],
          },
          token: 'mock-jwt-token-' + Date.now(),
        },
      };
    }
  },

  // Verify token (mock)
  verifyToken: async (token) => {
    return {
      success: true,
      valid: !!token,
    };
  },
};
