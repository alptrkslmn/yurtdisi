import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

const NotFound = () => {
  // Bulunamayan sayfadan direkt ana sayfaya yönlendir
  return <Navigate to="/" replace />;
};

export default NotFound;
