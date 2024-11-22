import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

// Yetki gerektiren componentler için HOC
export const WithPermission = ({ 
  permission, 
  role,
  country,
  fallback = () => <Navigate to="/" replace />,
  children 
}) => {
  const { hasPermission, hasRole, hasCountryAccess } = useAuth();

  // Yetki kontrolü
  const hasAccess = () => {
    if (permission && !hasPermission(permission)) return false;
    if (role && !hasRole(role)) return false;
    if (country && !hasCountryAccess(country)) return false;
    return true;
  };

  return hasAccess() ? children : fallback();
};

// Birden fazla yetki gerektiren durumlar için
export const WithPermissions = ({ 
  permissions = [], 
  roles = [],
  countries = [],
  requireAll = true,
  fallback = () => <Navigate to="/" replace />,
  children 
}) => {
  const { hasPermission, hasRole, hasCountryAccess } = useAuth();

  // Yetki kontrolü
  const hasAccess = () => {
    // Tüm yetkilerin gerekli olduğu durum
    if (requireAll) {
      const hasAllPermissions = permissions.every(p => hasPermission(p));
      const hasAllRoles = roles.every(r => hasRole(r));
      const hasAllCountries = countries.every(c => hasCountryAccess(c));
      return hasAllPermissions && hasAllRoles && hasAllCountries;
    }
    
    // En az bir yetkinin yeterli olduğu durum
    const hasAnyPermission = permissions.length === 0 || permissions.some(p => hasPermission(p));
    const hasAnyRole = roles.length === 0 || roles.some(r => hasRole(r));
    const hasAnyCountry = countries.length === 0 || countries.some(c => hasCountryAccess(c));
    return hasAnyPermission && hasAnyRole && hasAnyCountry;
  };

  return hasAccess() ? children : fallback();
};
