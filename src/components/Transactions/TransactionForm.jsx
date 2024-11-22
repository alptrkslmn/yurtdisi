import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const TransactionForm = ({ onSubmit, initialData = null }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        amount: '',
        description: '',
        category: '',
        currency: 'TRY',
        organization_id: '',
    });
    const [organizations, setOrganizations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        // İlk yükleme
        const loadInitialData = async () => {
            try {
                // Organizasyonları yükle
                const orgsResponse = await window.electron.invoke('get-organizations');
                setOrganizations(orgsResponse);

                // Kategorileri yükle
                const catsResponse = await window.electron.invoke('get-categories');
                setCategories(catsResponse);

                // Para birimlerini yükle
                const currResponse = await window.electron.invoke('get-currencies');
                setCurrencies(currResponse);

                // Eğer düzenleme modundaysa, mevcut veriyi form'a yükle
                if (initialData) {
                    setFormData(initialData);
                }
            } catch (error) {
                console.error('Form verisi yüklenirken hata:', error);
            }
        };

        loadInitialData();
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const transactionData = {
                ...formData,
                user_id: user.id,
                amount: parseFloat(formData.amount)
            };

            await onSubmit(transactionData);
            
            // Formu sıfırla
            setFormData({
                date: new Date().toISOString().split('T')[0],
                type: 'expense',
                amount: '',
                description: '',
                category: '',
                currency: 'TRY',
                organization_id: '',
            });
        } catch (error) {
            console.error('İşlem kaydedilirken hata:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tarih
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        İşlem Tipi
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        required
                    >
                        <option value="expense">Gider</option>
                        <option value="income">Gelir</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tutar
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Para Birimi
                    </label>
                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        required
                    >
                        {currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>
                                {currency.name} ({currency.symbol})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Kurum
                    </label>
                    <select
                        name="organization_id"
                        value={formData.organization_id}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        required
                    >
                        <option value="">Kurum Seçin</option>
                        {organizations.map(org => (
                            <option key={org.id} value={org.id}>
                                {org.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Kategori
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                        required
                    >
                        <option value="">Kategori Seçin</option>
                        {categories
                            .filter(cat => cat.type === formData.type)
                            .map(category => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Açıklama
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                ></textarea>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {initialData ? 'Güncelle' : 'Kaydet'}
                </button>
            </div>
        </form>
    );
};

export default TransactionForm;
