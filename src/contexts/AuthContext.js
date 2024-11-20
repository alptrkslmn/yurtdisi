import React, { createContext, useContext, useState, useCallback } from 'react';
import { ROLES, ROLE_PERMISSIONS } from '../constants/permissions';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Geliştirme aşamasında test için tüm yetkilere sahip bir kullanıcı
  const [user, setUser] = useState({
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: ROLES.SUPER_ADMIN,
    country: 'tr',
    permissions: ROLE_PERMISSIONS[ROLES.SUPER_ADMIN]
  });
  const [loading, setLoading] = useState(false);

  // Kullanıcı girişi
  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      // TODO: API çağrısı yapılacak
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: ROLES.SUPER_ADMIN,
        country: 'tr',
        permissions: ROLE_PERMISSIONS[ROLES.SUPER_ADMIN]
      };
      
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Kullanıcı çıkışı
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: API çağrısı yapılacak
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Kullanıcının yetkisini kontrol et
  const hasPermission = useCallback((permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  }, [user]);

  // Kullanıcının rolünü kontrol et
  const hasRole = useCallback((role) => {
    if (!user || !user.role) return false;
    return user.role === role;
  }, [user]);

  // Kullanıcının ülke yetkisini kontrol et
  const hasCountryAccess = useCallback((country) => {
    if (!user) return false;
    if (user.role === ROLES.SUPER_ADMIN) return true;
    return user.country === country;
  }, [user]);

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    hasRole,
    hasCountryAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
