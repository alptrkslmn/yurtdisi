import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/themeContext';
import { useAuth } from '../../../contexts/authContext';
import { useSidebar } from '../../../contexts/sidebarContext'; 
import { 
  SunIcon, 
  MoonIcon,
  BellIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();

  return (
    <>
      {/* Header background and border */}
      <div 
        className="fixed top-0 right-0 h-16 z-40"
        style={{ 
          left: '256px',
          marginLeft: isCollapsed ? '-192px' : '0'
        }}
      >
        <div className="w-full h-full bg-white dark:bg-gray-800" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700" />
      </div>
      
      {/* Header content */}
      <header 
        className="fixed top-0 right-0 z-50" 
        style={{ 
          left: '256px',
          marginLeft: isCollapsed ? '-192px' : '0'
        }}
      >
        <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left side - Title */}
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('header.title')}
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="header-button"
              aria-label={isDarkMode ? t('common.theme.light') : t('common.theme.dark')}
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transform transition-transform duration-500 ${isDarkMode ? 'rotate-0' : '-rotate-90 opacity-0'}`}>
                  <MoonIcon className="h-6 w-6" />
                </div>
                <div className={`absolute inset-0 transform transition-transform duration-500 ${isDarkMode ? 'rotate-90 opacity-0' : 'rotate-0'}`}>
                  <SunIcon className="h-6 w-6" />
                </div>
              </div>
            </button>

            {/* Notifications */}
            <button className="header-button">
              <BellIcon className="h-6 w-6" />
            </button>

            {/* Profile */}
            <button className="header-button">
              <UserIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;