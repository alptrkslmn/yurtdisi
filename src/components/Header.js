import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        setIsDarkMode(!isDarkMode);
    };

    return (
        <header className="bg-white dark:bg-dark-secondary border-b border-gray-200 dark:border-dark-accent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-end h-16">
                    <div className="flex items-center">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-accent transition-colors duration-200"
                            title={isDarkMode ? 'Açık Mod' : 'Koyu Mod'}
                        >
                            {isDarkMode ? (
                                <SunIcon className="h-6 w-6 text-yellow-500 transition-transform duration-300 hover:rotate-90" />
                            ) : (
                                <MoonIcon className="h-6 w-6 text-gray-500 transition-transform duration-300 hover:-rotate-12" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
