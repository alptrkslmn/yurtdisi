import React, { useState, useEffect } from 'react';
const { getCategories, addCategory, deleteCategory, getCurrencies } = window.electron.database;

function Settings() {
    const [categories, setCategories] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ name: '', type: 'expense' });

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
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Ayarlar
            </h1>

            <div className="space-y-6">
                {/* Genel Ayarlar */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Genel Ayarlar
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-gray-700 dark:text-gray-300">
                                    Karanlık Mod
                                </span>
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Varsayılan Para Birimi
                            </label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {currencies.map((currency, index) => (
                                    <option key={index} value={currency.value}>
                                        {currency.text}
                                    </option>
                                ))}
                            </select>
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
    );
}

export default Settings;
