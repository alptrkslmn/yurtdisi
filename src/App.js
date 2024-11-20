import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard/Dashboard';
import Countries from './components/Countries/Countries';
import Settings from './components/Settings/Settings';

// Geçici bileşenler
const Organizations = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Kurumlar</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <p className="text-gray-500 dark:text-gray-400">Kurum yönetimi yakında eklenecek...</p>
    </div>
  </div>
);

const Categories = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Kategoriler</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <p className="text-gray-500 dark:text-gray-400">Kategori yönetimi yakında eklenecek...</p>
    </div>
  </div>
);

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
    console.log('Initial dark mode:', isDark);
    return isDark;
  });

  useEffect(() => {
    console.log('Updating dark mode:', isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header darkMode={isDarkMode} setDarkMode={setIsDarkMode} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
