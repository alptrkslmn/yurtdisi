import React, { createContext, useContext, useState } from 'react';
import { ROLES, ROLE_PERMISSIONS } from '../constants/permissions';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Mock user - Bu kısmı gerçek authentication sistemi ile değiştireceğiz
  const [user] = useState({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: ROLES.SUPER_ADMIN,
    country: 'tr' // Ülke koordinatörü için kullanılacak
  });

  const hasPermission = (permission) => {
    if (!user || !user.role) return false;
    
    const userPermissions = ROLE_PERMISSIONS[user.role];
    return userPermissions ? userPermissions.includes(permission) : false;
  };

  const value = {
    user,
    hasPermission,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
