import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard/Dashboard';
import Organizations from './components/Organizations/Organizations';
import Settings from './components/Settings/Settings';
import Categories from './components/Categories/Categories';

const Reports = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Raporlar</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <p className="text-gray-500 dark:text-gray-400">Raporlama sistemi yakında eklenecek...</p>
    </div>
  </div>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    return isDark;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64">
        <Header darkMode={isDarkMode} setDarkMode={setIsDarkMode} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/organizations/:countryId" element={<Organizations />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/items" element={<Categories items />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings/*" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
