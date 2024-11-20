import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const MonthlyReport = () => {
    const { user } = useAuth();
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [organizations, setOrganizations] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [reports, setReports] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        if (selectedCountry && selectedMonth) {
            loadReports();
        }
    }, [selectedCountry, selectedMonth]);

    const loadInitialData = async () => {
        try {
            const [orgsResponse, countriesResponse] = await Promise.all([
                window.electron.invoke('get-organizations'),
                window.electron.invoke('get-countries')
            ]);
            setOrganizations(orgsResponse);
            setCountries(countriesResponse);
        } catch (error) {
            console.error('Veriler yüklenirken hata:', error);
            setError('Veriler yüklenirken bir hata oluştu');
        }
    };

    const loadReports = async () => {
        try {
            const [year, month] = selectedMonth.split('-');
            const response = await window.electron.invoke('get-country-summary', {
                country_id: selectedCountry,
                month,
                year: parseInt(year)
            });
            setReports(response);
        } catch (error) {
            console.error('Raporlar yüklenirken hata:', error);
            setError('Raporlar yüklenirken bir hata oluştu');
        }
    };

    const formatCurrency = (amount, currency) => {
        return new Intl.NumberFormat('tr-TR', { 
            style: 'currency', 
            currency: currency 
        }).format(amount);
    };

    return (
        <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Aylık Raporlar</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Ülke ve kurum bazında aylık gelir-gider raporları
                </p>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900 p-4 rounded-md">
                    <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ay Seçin
                    </label>
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ülke Seçin
                    </label>
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
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

            {reports.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                        {selectedMonth} Raporu
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Kurum
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Para Birimi
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Toplam Gelir
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Toplam Gider
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Bakiye
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {reports.map((report, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {report.organization_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {report.currency}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 dark:text-green-400">
                                            {formatCurrency(report.total_income, report.currency)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600 dark:text-red-400">
                                            {formatCurrency(report.total_expense, report.currency)}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                                            report.balance >= 0 
                                                ? 'text-green-600 dark:text-green-400' 
                                                : 'text-red-600 dark:text-red-400'
                                        }`}>
                                            {formatCurrency(report.balance, report.currency)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonthlyReport;
