import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CategoryManager = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', type: 'expense' });
    const [error, setError] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await window.electron.invoke('get-categories');
            setCategories(response);
        } catch (error) {
            console.error('Kategoriler yüklenirken hata:', error);
            setError('Kategoriler yüklenirken bir hata oluştu');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (!user.permissions.categories.includes('create')) {
                throw new Error('Bu işlem için yetkiniz yok');
            }

            await window.electron.invoke('add-category', newCategory);
            setNewCategory({ name: '', type: 'expense' });
            await loadCategories();
        } catch (error) {
            console.error('Kategori eklenirken hata:', error);
            setError(error.message);
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            if (!user.permissions.categories.includes('delete')) {
                throw new Error('Bu işlem için yetkiniz yok');
            }

            await window.electron.invoke('delete-category', categoryId);
            await loadCategories();
        } catch (error) {
            console.error('Kategori silinirken hata:', error);
            setError(error.message);
        }
    };

    return (
        <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Kategori Yönetimi</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Yeni kategoriler ekleyin ve mevcut kategorileri yönetin.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900 p-4 rounded-md">
                    <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Kategori Adı
                        </label>
                        <input
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Kategori Tipi
                        </label>
                        <select
                            value={newCategory.type}
                            onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="expense">Gider</option>
                            <option value="income">Gelir</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        disabled={!user.permissions.categories.includes('create')}
                    >
                        Kategori Ekle
                    </button>
                </div>
            </form>

            <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Mevcut Kategoriler</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gelir Kategorileri</h4>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {categories
                                .filter(cat => cat.type === 'income')
                                .map(category => (
                                    <li
                                        key={category.id}
                                        className="py-3 flex justify-between items-center"
                                    >
                                        <span className="text-sm text-gray-900 dark:text-gray-100">
                                            {category.name}
                                        </span>
                                        {user.permissions.categories.includes('delete') && (
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                Sil
                                            </button>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gider Kategorileri</h4>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {categories
                                .filter(cat => cat.type === 'expense')
                                .map(category => (
                                    <li
                                        key={category.id}
                                        className="py-3 flex justify-between items-center"
                                    >
                                        <span className="text-sm text-gray-900 dark:text-gray-100">
                                            {category.name}
                                        </span>
                                        {user.permissions.categories.includes('delete') && (
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                Sil
                                            </button>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;
