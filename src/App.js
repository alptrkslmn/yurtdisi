import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/theme.css';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

import { AuthProvider } from './contexts/AuthContext';
import { WithPermission } from './components/auth/WithPermission';
import { PERMISSIONS } from './constants/permissions';

// Layout ve sayfa bileşenleri
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Countries from './components/Countries/Countries';
import PreAccounting from './components/PreAccounting/PreAccounting';
import Reports from './components/Reports/Reports';
import Settings from './components/Settings/Settings';
import Login from './components/auth/Login';
import NotFound from './components/NotFound';

function AppContent() {
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  useEffect(() => {
    // Sadece Türkçe dil desteği
    document.documentElement.lang = 'tr';
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="countries/*" element={<Countries />} />
            <Route path="pre-accounting" element={<PreAccounting />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings/*" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
