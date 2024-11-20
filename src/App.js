import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';

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
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="md:pl-64 flex flex-col min-h-screen">
        <Header darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/settings/*" element={<Settings />} />
              <Route path="/pre-accounting" element={<PreAccounting />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
