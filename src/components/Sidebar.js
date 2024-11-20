import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    FolderIcon,
    GlobeAltIcon,
    BuildingOfficeIcon,
    ChartBarIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

function Sidebar() {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const menuItems = [
        { path: '/', icon: HomeIcon, text: 'Ana Sayfa' },
        { path: '/countries', icon: GlobeAltIcon, text: 'Ülkeler' },
        { path: '/organizations', icon: BuildingOfficeIcon, text: 'Kurumlar' },
        { path: '/categories', icon: FolderIcon, text: 'Kategoriler' },
        { path: '/reports', icon: ChartBarIcon, text: 'Raporlar' },
    ];

    return (
        <div className={`relative flex flex-col h-screen bg-white dark:bg-dark-secondary transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} border-r border-gray-200 dark:border-dark-accent`}>
            <div className="flex items-center justify-between p-4">
                {!isCollapsed && <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hüdayi</h1>}
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-accent transition-colors duration-200"
                >
                    {isCollapsed ? (
                        <ChevronRightIcon className="h-5 w-5 text-gray-500 dark:text-dark-primary" />
                    ) : (
                        <ChevronLeftIcon className="h-5 w-5 text-gray-500 dark:text-dark-primary" />
                    )}
                </button>
            </div>

            <nav className="flex-1 space-y-1 p-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} p-3 rounded-lg transition-colors duration-200 ${
                                isActive
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                    : 'text-gray-700 dark:text-dark-primary hover:bg-gray-100 dark:hover:bg-dark-accent'
                            }`}
                        >
                            <Icon className="h-6 w-6 flex-shrink-0" />
                            {!isCollapsed && <span className="ml-3">{item.text}</span>}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default Sidebar;
