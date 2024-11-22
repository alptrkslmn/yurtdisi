import React from 'react';
import { useAuth } from '../../contexts/authContext';
import NotFound from '../../pages/error/notFound';

const WithPermission = ({ children, permission }) => {
  const { user } = useAuth();
  
  // If no permission is required, render the children
  if (!permission) {
    return children;
  }

  // Check if user has the required permission
  const hasPermission = user?.permissions?.includes(permission);

  // If user has permission, render the children, otherwise show not found
  return hasPermission ? children : <NotFound />;
};

export default WithPermission;
