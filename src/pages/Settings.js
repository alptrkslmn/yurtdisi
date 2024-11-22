import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/settings.css';
const { getCategories, addCategory, deleteCategory, getCurrencies } = window.electron.database;

function Settings() {
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
                        Ayarlar
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
                                        Genel Ayarlar
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Temel uygulama ayarlarını buradan yönetebilirsiniz
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
                                                <h3 className="font-medium text-gray-900 dark:text-white">
                                                    Koyu Tema
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Koyu tema tercihini ayarlayın
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative inline-block w-14 align-middle select-none">
                                        <input
                                            type="checkbox"
                                            name="darkMode"
                                            id="darkMode"
                                            checked={darkMode}
                                            onChange={toggleDarkMode}
                                            className="absolute block w-6 h-6 transition-transform duration-200 ease-in-out transform bg-white border-4 rounded-full appearance-none cursor-pointer peer border-gray-300 peer-checked:border-blue-600 peer-checked:translate-x-8"
                                        />
                                        <label
                                            htmlFor="darkMode"
                                            className="block h-6 overflow-hidden transition-colors duration-200 ease-in-out bg-gray-300 rounded-full cursor-pointer peer-checked:bg-blue-600"
                                        />
                                    </div>
                                </div>

                                {/* Tema Rengi Seçici */}
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">
                                                Tema Rengi
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Uygulamanın ana rengini seçin
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                                        {Object.entries(themes).map(([name, theme]) => (
                                            <button
                                                key={name}
                                                onClick={() => updateTheme(name)}
                                                className={`w-full aspect-square rounded-xl flex items-center justify-center bg-gradient-to-br ${theme.primary} text-white transition-transform hover:scale-105 ${
                                                    currentTheme === name ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-blue-500 scale-105' : ''
                                                }`}
                                            >
                                                {theme.icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Para Birimi Seçici */}
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">
                                                Varsayılan Para Birimi
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Tüm işlemlerde kullanılacak para birimini seçin
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <select 
                                            className="w-full h-11 pl-4 pr-10 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                        >
                                            {currencies.map((currency, index) => (
                                                <option key={index} value={currency.value}>
                                                    {currency.text}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kategori Yönetimi */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Kategori Yönetimi
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Yeni Kategori
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        placeholder="Kategori adı"
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    <button
                                        onClick={handleAddCategory}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Ekle
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Mevcut Kategoriler
                                </h3>
                                <div className="space-y-2">
                                    {categories.map((category, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                            <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                                            <button
                                                onClick={() => handleDeleteCategory(category.id)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400"
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Yedekleme */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Yedekleme ve Geri Yükleme
                        </h2>
                        <div className="space-y-4">
                            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                                Verileri Yedekle
                            </button>
                            <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                                Yedekten Geri Yükle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
