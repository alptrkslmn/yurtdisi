import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';

import { AuthProvider } from './contexts/AuthContext';
import { WithPermission } from './components/auth/WithPermission';
import { PERMISSIONS } from './constants/permissions';

import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard/Dashboard';
import Organizations from './components/Organizations/Organizations';
import Settings from './components/Settings/Settings';
import PreAccounting from './components/PreAccounting/PreAccounting.jsx';
import Reports from './components/Reports/Reports';

function App() {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
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
                path="/countries/*" 
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
