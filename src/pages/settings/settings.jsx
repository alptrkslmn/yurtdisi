import React from 'react';
import { useTranslation } from 'react-i18next';

// Contexts
import { useTheme } from '../../contexts/themeContext';

// Styles
import '../../styles/settings.css';

import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// Development ortamında mock data kullanıyoruz
const isDevelopment = process.env.NODE_ENV === 'development';
const mockDatabase = {
    getCategories: async () => [],
    addCategory: async () => {},
    deleteCategory: async () => {},
    getCurrencies: async () => []
};

const database = isDevelopment ? mockDatabase : window.electron.database;
const { getCategories, addCategory, deleteCategory, getCurrencies } = database;

function Settings() {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ name: '', type: 'expense' });
    const { darkMode, toggleDarkMode, currentTheme, updateTheme, themes } = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);

                const currenciesData = await getCurrencies();
                setCurrencies(currenciesData);
            } catch (error) {
                console.error('Veri yükleme hatası:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const result = await addCategory(newCategory);
            setCategories([...categories, result]);
            setNewCategory({ name: '', type: 'expense' });
        } catch (error) {
            console.error('Kategori ekleme hatası:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            setCategories(categories.filter(c => c.id !== id));
        } catch (error) {
            console.error('Kategori silme hatası:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {t('settings.title')}
                    </h1>
                </div>

                <div className="grid gap-8">
                    {/* Genel Ayarlar */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                        <div className="p-6">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {t('settings.general')}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {t('settings.generalDescription')}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Dark Mode Toggle */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {t('settings.darkMode')}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {t('settings.darkModeDescription')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <button
                                            onClick={toggleDarkMode}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
                                            role="switch"
                                            aria-checked={darkMode}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Theme Selector */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {t('settings.theme')}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {t('settings.themeDescription')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <select
                                            value={currentTheme}
                                            onChange={(e) => updateTheme(e.target.value)}
                                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        >
                                            {themes.map((theme) => (
                                                <option key={theme} value={theme}>
                                                    {t(`settings.themes.${theme}`)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alt sayfalar için Outlet */}
                <div className="mt-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Settings;
