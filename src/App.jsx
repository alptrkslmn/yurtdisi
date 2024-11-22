import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { WithPermission } from './components/auth/WithPermission';
import { PERMISSIONS } from './constants/permissions';
import './styles/theme.css';
import './i18n';

// Layout ve sayfa bileşenleri
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Reports from './components/Reports/Reports';
import PreAccounting from './components/PreAccounting/PreAccounting';
import CountriesSettings from './pages/Settings/CountriesSettings';
import OrganizationsSettings from './pages/Settings/OrganizationsSettings';
import UsersSettings from './pages/Settings/UsersSettings';
import Countries from './pages/Countries';
import Organizations from './pages/Organizations';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Sidebar from './components/Sidebar';
import Loader from './components/Common/Loader';

function AppContent() {
  const { t } = useTranslation();
  const { isDarkMode, currentTheme } = useTheme();

  useEffect(() => {
    document.documentElement.lang = 'tr';
  }, []);

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''} theme-${currentTheme}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="countries/*" element={<Countries />} />
              <Route path="organizations/*" element={<Organizations />} />
              <Route path="pre-accounting" element={<PreAccounting />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />}>
                <Route path="countries" element={<CountriesSettings />} />
                <Route path="organizations" element={<OrganizationsSettings />} />
                <Route path="users" element={<UsersSettings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;