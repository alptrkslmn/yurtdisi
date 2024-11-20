import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const OrganizationManager = () => {
    const { user } = useAuth();
    const [countries, setCountries] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [newCountry, setNewCountry] = useState({ name: '', code: '' });
    const [newOrganization, setNewOrganization] = useState({ name: '', country_id: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [countriesResponse, orgsResponse] = await Promise.all([
                window.electron.invoke('get-countries'),
                window.electron.invoke('get-organizations')
            ]);
            setCountries(countriesResponse);
            setOrganizations(orgsResponse);
        } catch (error) {
            console.error('Veriler yüklenirken hata:', error);
            setError('Veriler yüklenirken bir hata oluştu');
        }
    };

    const handleCountrySubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (!user.permissions.countries.includes('create')) {
                throw new Error('Bu işlem için yetkiniz yok');
            }

            await window.electron.invoke('add-country', newCountry);
            setNewCountry({ name: '', code: '' });
            await loadData();
        } catch (error) {
            console.error('Ülke eklenirken hata:', error);
            setError(error.message);
        }
    };

    const handleOrganizationSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (!user.permissions.organizations.includes('create')) {
                throw new Error('Bu işlem için yetkiniz yok');
            }

            await window.electron.invoke('add-organization', newOrganization);
            setNewOrganization({ name: '', country_id: '' });
            await loadData();
        } catch (error) {
            console.error('Kurum eklenirken hata:', error);
            setError(error.message);
        }
    };

    const handleDelete = async (type, id) => {
        try {
            if (!user.permissions[type].includes('delete')) {
                throw new Error('Bu işlem için yetkiniz yok');
            }

            await window.electron.invoke(`delete-${type.slice(0, -1)}`, id);
            await loadData();
        } catch (error) {
            console.error(`${type} silinirken hata:`, error);
            setError(error.message);
        }
    };

    return (
        <div className="space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            {error && (
                <div className="bg-red-50 dark:bg-red-900 p-4 rounded-md">
                    <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                </div>
            )}

            {/* Ülke Yönetimi */}
            <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Ülke Yönetimi</h2>
                <div className="mt-4">
                    <form onSubmit={handleCountrySubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Ülke Adı
                                </label>
                                <input
                                    type="text"
                                    value={newCountry.name}
                                    onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Ülke Kodu
                                </label>
                                <input
                                    type="text"
                                    value={newCountry.code}
                                    onChange={(e) => setNewCountry({ ...newCountry, code: e.target.value.toUpperCase() })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                                    required
                                    maxLength="2"
                                    pattern="[A-Za-z]{2}"
                                    title="İki harfli ülke kodu (örn: TR)"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                disabled={!user.permissions.countries.includes('create')}
                            >
                                Ülke Ekle
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Mevcut Ülkeler</h3>
                        <ul className="mt-2 divide-y divide-gray-200 dark:divide-gray-700">
                            {countries.map(country => (
                                <li
                                    key={country.id}
                                    className="py-3 flex justify-between items-center"
                                >
                                    <div>
                                        <span className="text-sm text-gray-900 dark:text-gray-100">
                                            {country.name}
                                        </span>
                                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                            ({country.code})
                                        </span>
                                    </div>
                                    {user.permissions.countries.includes('delete') && (
                                        <button
                                            onClick={() => handleDelete('countries', country.id)}
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

            {/* Kurum Yönetimi */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Kurum Yönetimi</h2>
                <div className="mt-4">
                    <form onSubmit={handleOrganizationSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Kurum Adı
                                </label>
                                <input
                                    type="text"
                                    value={newOrganization.name}
                                    onChange={(e) => setNewOrganization({ ...newOrganization, name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Ülke
                                </label>
                                <select
                                    value={newOrganization.country_id}
                                    onChange={(e) => setNewOrganization({ ...newOrganization, country_id: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                                    required
                                >
                                    <option value="">Ülke Seçin</option>
                                    {countries.map(country => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                disabled={!user.permissions.organizations.includes('create')}
                            >
                                Kurum Ekle
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Mevcut Kurumlar</h3>
                        <ul className="mt-2 divide-y divide-gray-200 dark:divide-gray-700">
                            {organizations.map(org => (
                                <li
                                    key={org.id}
                                    className="py-3 flex justify-between items-center"
                                >
                                    <div>
                                        <span className="text-sm text-gray-900 dark:text-gray-100">
                                            {org.name}
                                        </span>
                                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                            ({countries.find(c => c.id === org.country_id)?.name || 'Bilinmeyen Ülke'})
                                        </span>
                                    </div>
                                    {user.permissions.organizations.includes('delete') && (
                                        <button
                                            onClick={() => handleDelete('organizations', org.id)}
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

export default OrganizationManager;
