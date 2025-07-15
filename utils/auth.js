// Authentication utility functions
const AuthUtils = {
  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate password strength
  isValidPassword: (password) => {
    return password.length >= 6;
  },

  // Generate user ID
  generateUserId: () => {
    return 'user_' + Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // Save user session
  saveUserSession: (userData) => {
    try {
      localStorage.setItem('communityy_user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Failed to save user session:', error);
      return false;
    }
  },

  // Get user session
  getUserSession: () => {
    try {
      const userData = localStorage.getItem('communityy_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to get user session:', error);
      return null;
    }
  },

  // Clear user session
  clearUserSession: () => {
    try {
      localStorage.removeItem('communityy_user');
      return true;
    } catch (error) {
      console.error('Failed to clear user session:', error);
      return false;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return AuthUtils.getUserSession() !== null;
  },

  // Format user data
  formatUserData: (formData, role = 'member') => {
    return {
      id: AuthUtils.generateUserId(),
      name: formData.name,
      email: formData.email,
      role: role,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
  }
};