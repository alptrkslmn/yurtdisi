import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from './context/ThemeContext';

import { AuthProvider } from './contexts/AuthContext';
import { WithPermission } from './components/auth/WithPermission';
import { PERMISSIONS } from './constants/permissions';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Organizations from './components/Organizations/Organizations';
import Settings from './components/Settings/Settings';
import PreAccounting from './components/PreAccounting/PreAccounting';
import Reports from './components/Reports/Reports';

function App() {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const { currentTheme, themes } = useTheme();

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Tema renklerini güvenli bir şekilde kullan
  const getThemeClasses = (property) => {
    if (!themes || !currentTheme || !themes[currentTheme]) return '';
    return themes[currentTheme][property] || '';
  };

  return (
    <AuthProvider>
      <div className={`min-h-screen transition-colors duration-200
        bg-gradient-to-br from-gray-50 to-gray-100 
        dark:from-gray-900 dark:to-gray-800
        ${getThemeClasses('accent')}`}>
        <Sidebar />
        <div className="md:pl-64">
          <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <main className="p-8">
            <Routes>
              <Route 
                path="/" 
                element={
                  <WithPermission permission={PERMISSIONS.DASHBOARD.VIEW}>
                    <Dashboard />
                  </WithPermission>
                } 
              />
              <Route 
                path="/countries" 
                element={
                  <WithPermission permission={PERMISSIONS.COUNTRY.VIEW}>
                    <Organizations />
                  </WithPermission>
                } 
              />
              <Route 
                path="/countries/:countryId" 
                element={
                  <WithPermission permission={PERMISSIONS.COUNTRY.VIEW}>
                    <Organizations />
                  </WithPermission>
                } 
              />
              <Route 
                path="/pre-accounting" 
                element={
                  <WithPermission permission={PERMISSIONS.FINANCIAL.VIEW}>
                    <PreAccounting />
                  </WithPermission>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <WithPermission permission={PERMISSIONS.REPORT.VIEW}>
                    <Reports />
                  </WithPermission>
                } 
              />
              <Route 
                path="/settings/*" 
                element={
                  <WithPermission permission={PERMISSIONS.DASHBOARD.VIEW}>
                    <Settings />
                  </WithPermission>
                } 
              />
            </Routes>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
