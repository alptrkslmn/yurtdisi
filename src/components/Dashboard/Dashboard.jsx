import React, { useState } from 'react';
import { 
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  DocumentChartBarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Örnek veri
const mockData = {
  stats: [
    {
      id: 1,
      name: 'Toplam Gelir',
      value: '₺2,435,890',
      change: '+12.5%',
      trend: 'up',
      icon: CurrencyDollarIcon,
      color: 'emerald'
    },
    {
      id: 2,
      name: 'Toplam Gider',
      value: '₺1,874,320',
      change: '+8.2%',
      trend: 'up',
      icon: ArrowTrendingDownIcon,
      color: 'rose'
    },
    {
      id: 3,
      name: 'Aktif Kurum',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: BuildingOfficeIcon,
      color: 'blue'
    },
    {
      id: 4,
      name: 'Aylık Rapor',
      value: '149',
      change: '+28.5%',
      trend: 'up',
      icon: DocumentChartBarIcon,
      color: 'amber'
    },
  ],
  recentTransactions: [
    {
      id: 1,
      institution: 'Berlin Şubesi',
      type: 'Gelir',
      amount: '€12,450',
      status: 'completed',
      date: '2024-03-21'
    },
    {
      id: 2,
      institution: 'Paris Şubesi',
      type: 'Gider',
      amount: '€8,720',
      status: 'pending',
      date: '2024-03-20'
    },
    {
      id: 3,
      institution: 'Londra Şubesi',
      type: 'Gelir',
      amount: '£15,890',
      status: 'completed',
      date: '2024-03-19'
    },
    {
      id: 4,
      institution: 'New York Şubesi',
      type: 'Gider',
      amount: '$22,340',
      status: 'failed',
      date: '2024-03-18'
    },
  ]
};

const Dashboard = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exportType, setExportType] = useState(null);

  const handleExport = async (type) => {
    if (isExporting) return; // Zaten export işlemi devam ediyorsa çık
    
    setExportType(type);
    setIsExporting(true);
    
    try {
      // Simüle edilmiş export işlemi
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Exporting as ${type}...`);
      
      // Gerçek export işlemi burada yapılacak
      if (type === 'excel') {
        // Excel export işlemi
        console.log('Excel export completed');
      } else if (type === 'pdf') {
        // PDF export işlemi
        console.log('PDF export completed');
      }
      
    } catch (error) {
      console.error(`${type} export failed:`, error);
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simüle edilmiş yenileme işlemi
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Refreshing data...');
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="p-6">
      {/* Başlık ve Butonlar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Özet</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Finansal durumunuza genel bakış
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Yenile butonu */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-secondary"
          >
            <ArrowPathIcon className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Yenileniyor...' : 'Yenile'}
          </button>

          {/* Excel'e Aktar */}
          <button
            onClick={() => handleExport('excel')}
            disabled={isExporting}
            className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg overflow-hidden transition-all duration-300
              bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800
              text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            {exportType === 'excel' && isExporting ? 'Excel\'e Aktarılıyor...' : 'Excel'}
            {exportType === 'excel' && isExporting && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </button>

          {/* PDF'e Aktar */}
          <button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg overflow-hidden transition-all duration-300
              bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800
              text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            {exportType === 'pdf' && isExporting ? 'PDF\'e Aktarılıyor...' : 'PDF'}
            {exportType === 'pdf' && isExporting && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockData.stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${
                    stat.trend === 'up'
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/20'
                      : 'text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/20'
                  }`}
              >
                {stat.trend === 'up' ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                )}
                {stat.change}
              </div>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                geçen aydan
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Son İşlemler Tablosu */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Son İşlemler
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Kurum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlem Tipi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tarih
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {mockData.recentTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.institution}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          transaction.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400'
                        }`}
                    >
                      {transaction.status === 'completed' && 'Tamamlandı'}
                      {transaction.status === 'pending' && 'Beklemede'}
                      {transaction.status === 'failed' && 'Başarısız'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(transaction.date).toLocaleDateString('tr-TR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
