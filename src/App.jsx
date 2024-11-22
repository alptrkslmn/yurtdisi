import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';

// Contexts ve Yetkilendirme
import { AuthProvider } from './contexts/authContext';
import { WithPermission } from './components/auth/withPermission';
import { ThemeProvider, useTheme } from './contexts/themeContext';
import { SidebarProvider } from './contexts/sidebarContext';
import { PERMISSIONS } from './constants/permissions';

// Layout ve sayfa bileşenleri
import Layout from './components/layout/layout/layout';
import LanguageSwitcher from './components/common/language/languageSwitcher';
import Dashboard from './components/dashboard/dashboard';
import Countries from './components/features/countries/countries/countries';
import PreAccounting from './components/preaccounting/preAccounting';
import Reports from './components/reports/Reports';
import Settings from './components/settings/settings';
import Login from './pages/auth/login/login';
import NotFound from './pages/error/notFound';

function AppContent() {
  const { t } = useTranslation();
  const { isDarkMode, currentTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${currentTheme}`}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route
            path="dashboard"
            element={
              <WithPermission permission={PERMISSIONS.VIEW_DASHBOARD}>
                <Dashboard />
              </WithPermission>
            }
          />
          <Route
            path="countries"
            element={
              <WithPermission permission={PERMISSIONS.VIEW_COUNTRIES}>
                <Countries />
              </WithPermission>
            }
          />
          <Route
            path="preaccounting"
            element={
              <WithPermission permission={PERMISSIONS.VIEW_PREACCOUNTING}>
                <PreAccounting />
              </WithPermission>
            }
          />
          <Route
            path="reports"
            element={
              <WithPermission permission={PERMISSIONS.VIEW_REPORTS}>
                <Reports />
              </WithPermission>
            }
          />
          <Route
            path="settings/*"
            element={
              <WithPermission permission={PERMISSIONS.VIEW_SETTINGS}>
                <Settings />
              </WithPermission>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LanguageSwitcher />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
