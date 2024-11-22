import React from 'react';
import {
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    BuildingOfficeIcon,
    GlobeAsiaAustraliaIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

function Dashboard() {
    const { t } = useTranslation();
    // Örnek veriler
    const stats = {
        totalIncome: 150000,
        totalExpense: 75000,
        netProfit: 75000,
        organizationCount: 12,
        countryCount: 8
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {t('sidebar.menu.dashboard')}
                    </h1>
                </div>
                
                <div className="grid gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {/* Toplam Gelir */}
                                <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                                            <ArrowTrendingUpIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div className="mx-5">
                                            <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                                ${stats.totalIncome.toLocaleString()}
                                            </h4>
                                            <div className="text-gray-500 dark:text-gray-400">Toplam Gelir</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Toplam Gider */}
                                <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                                            <ArrowTrendingDownIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
                                        </div>
                                        <div className="mx-5">
                                            <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                                ${stats.totalExpense.toLocaleString()}
                                            </h4>
                                            <div className="text-gray-500 dark:text-gray-400">Toplam Gider</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Net Kar */}
                                <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                                            <CurrencyDollarIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="mx-5">
                                            <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                                ${stats.netProfit.toLocaleString()}
                                            </h4>
                                            <div className="text-gray-500 dark:text-gray-400">Net Kar</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Kurum Sayısı */}
                                <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                                            <BuildingOfficeIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div className="mx-5">
                                            <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                                {stats.organizationCount}
                                            </h4>
                                            <div className="text-gray-500 dark:text-gray-400">Toplam Kurum</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ülke Sayısı */}
                                <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                                            <GlobeAsiaAustraliaIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                        <div className="mx-5">
                                            <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                                {stats.countryCount}
                                            </h4>
                                            <div className="text-gray-500 dark:text-gray-400">Aktif Ülke</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
