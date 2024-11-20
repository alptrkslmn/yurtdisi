import React, { useState, useMemo } from 'react';
import { 
  ArrowDownTrayIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  DocumentChartBarIcon,
  ArrowPathIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Çoklu dil desteği için çeviri nesnesi
const translations = {
  tr: {
    summary: 'Özet',
    filter: 'Filtrele',
    year: 'Yıl',
    month: 'Ay',
    country: 'Ülke',
    institution: 'Kurum',
    allCountries: 'Tüm Ülkeler',
    allInstitutions: 'Tüm Kurumlar',
    totalIncome: 'Toplam Gelir',
    totalExpense: 'Toplam Gider',
    recentTransactions: 'Son İşlemler',
    refresh: 'Yenile',
    allYears: 'Tüm Yıllar',
    allMonths: 'Tüm Aylar'
  },
  en: {
    summary: 'Summary',
    filter: 'Filter',
    year: 'Year',
    month: 'Month',
    country: 'Country',
    institution: 'Institution',
    allCountries: 'All Countries',
    allInstitutions: 'All Institutions',
    totalIncome: 'Total Income',
    totalExpense: 'Total Expense',
    recentTransactions: 'Recent Transactions',
    refresh: 'Refresh',
    allYears: 'All Years',
    allMonths: 'All Months'
  }
};

// Para birimi ayarları
const currencySettings = {
  TRY: { symbol: '₺', locale: 'tr-TR' },
  USD: { symbol: '$', locale: 'en-US' },
  EUR: { symbol: '€', locale: 'de-DE' },
  GBP: { symbol: '£', locale: 'en-GB' }
};

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
      country: 'Almanya',
      type: 'income',
      amount: 12450,
      status: 'completed',
      date: '2024-03-21'
    },
    {
      id: 2,
      institution: 'Paris Şubesi',
      country: 'Fransa', 
      type: 'expense',
      amount: 8720,
      status: 'pending',
      date: '2024-03-20'
    },
    {
      id: 3,
      institution: 'Londra Şubesi',
      country: 'İngiltere',
      type: 'income',
      amount: 15890,
      status: 'completed',
      date: '2024-03-19'
    },
    {
      id: 4,
      institution: 'New York Şubesi',
      country: 'Amerika Birleşik Devletleri',
      type: 'expense',
      amount: 22340,
      status: 'failed',
      date: '2024-03-18'
    },
  ]
};

function Dashboard() {
  // Dil ve para birimi ayarları
  const [language, setLanguage] = useState('tr');
  const [currency, setCurrency] = useState('TRY');
  
  // Filtre ve görünüm durumları
  const [filters, setFilters] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    country: '',
    institution: '',
    currency: 'TRY'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filtrelenmiş ve toplam işlemler
  const filteredTransactions = useMemo(() => {
    return mockData.recentTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const matchesYear = !filters.year || transactionDate.getFullYear() === filters.year;
      const matchesMonth = !filters.month || transactionDate.getMonth() + 1 === filters.month;
      const matchesCountry = !filters.country || transaction.country === filters.country;
      const matchesInstitution = !filters.institution || transaction.institution === filters.institution;
      
      return matchesYear && matchesMonth && matchesCountry && matchesInstitution;
    });
  }, [filters, mockData.recentTransactions]);

  // Filtrelenmiş toplam gelir ve gider hesaplaması
  const filteredSummary = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { income, expense };
  }, [filteredTransactions]);

  // Para birimi dönüşüm fonksiyonu (basitleştirilmiş)
  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    // Gerçek döviz kuru API'si entegre edilecek
    const exchangeRates = {
      TRY: { USD: 0.038, EUR: 0.035, GBP: 0.030 },
      USD: { TRY: 26.5, EUR: 0.92, GBP: 0.79 },
      // Diğer döviz kurları...
    };

    if (fromCurrency === toCurrency) return amount;
    
    const rate = exchangeRates[fromCurrency][toCurrency];
    return amount * rate;
  };

  // Para birimi formatı
  const formatCurrency = (amount) => {
    const { symbol, locale } = currencySettings[currency];
    return new Intl.NumberFormat(locale, { 
      style: 'currency', 
      currency: currency 
    }).format(amount);
  };

  // Excel'e aktarma fonksiyonu
  const exportToExcel = () => {
    // Verileri Excel formatına dönüştür
    const transactionData = filteredTransactions.map(item => ({
      'Kurum': item.institution,
      'Ülke': item.country,
      'İşlem Tipi': item.type,
      'Tutar': item.amount,
      'Durum': item.status === 'completed' ? 'Tamamlandı' : 
               item.status === 'pending' ? 'Beklemede' : 'Başarısız',
      'Tarih': new Date(item.date).toLocaleDateString('tr-TR')
    }));

    const statsData = mockData.stats.map(item => ({
      'Gösterge': item.name,
      'Değer': item.value,
      'Değişim': item.change
    }));

    // İki sayfa oluştur: İstatistikler ve İşlemler
    const wb = XLSX.utils.book_new();
    
    const ws1 = XLSX.utils.json_to_sheet(statsData);
    XLSX.utils.book_append_sheet(wb, ws1, "İstatistikler");
    
    const ws2 = XLSX.utils.json_to_sheet(transactionData);
    XLSX.utils.book_append_sheet(wb, ws2, "Son İşlemler");

    // Excel dosyasını indir
    XLSX.writeFile(wb, "Hudayi_Rapor.xlsx");
  };

  // PDF'e aktarma fonksiyonu
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Başlık
    doc.setFontSize(20);
    doc.text("Hudayi Finansal Rapor", 14, 22);
    doc.setFontSize(12);
    doc.text(new Date().toLocaleDateString('tr-TR'), 14, 32);

    // İstatistikler
    doc.setFontSize(16);
    doc.text("İstatistikler", 14, 45);
    
    const statsData = mockData.stats.map(item => [
      item.name,
      item.value,
      item.change
    ]);

    doc.autoTable({
      startY: 50,
      head: [['Gösterge', 'Değer', 'Değişim']],
      body: statsData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }
    });

    // Son İşlemler
    doc.setFontSize(16);
    doc.text("Son İşlemler", 14, doc.autoTable.previous.finalY + 20);

    const transactionData = filteredTransactions.map(item => [
      item.institution,
      item.country,
      item.type,
      item.amount,
      item.status === 'completed' ? 'Tamamlandı' : 
      item.status === 'pending' ? 'Beklemede' : 'Başarısız',
      new Date(item.date).toLocaleDateString('tr-TR')
    ]);

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 25,
      head: [['Kurum', 'Ülke', 'İşlem Tipi', 'Tutar', 'Durum', 'Tarih']],
      body: transactionData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }
    });

    // PDF'i indir
    doc.save("Hudayi_Rapor.pdf");
  };

  const handleExport = async (type) => {
    if (isExporting) return;
    
    setExportType(type);
    setIsExporting(true);
    
    try {
      if (type === 'excel') {
        exportToExcel();
      } else if (type === 'pdf') {
        exportToPDF();
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
      {/* Üst Başlık ve Ayarlar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {translations[language].summary}
        </h1>
        
        <div className="flex items-center space-x-4">
          {/* Yenile Butonu */}
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg overflow-hidden
              bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800
              text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50
              transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg
              active:scale-95"
          >
            {isRefreshing ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowPathIcon className="h-5 w-5 transition-transform duration-200 group-hover:rotate-180" />
            )}
            {translations[language].refresh}
            {isRefreshing && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </button>

          {/* Export Butonları */}
          <button 
            onClick={() => handleExport('excel')}
            disabled={isExporting}
            className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg overflow-hidden
              bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800
              text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50
              transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg
              active:scale-95"
          >
            {isExporting && exportType === 'excel' ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowDownTrayIcon className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-1" />
            )}
            Excel
            {exportType === 'excel' && isExporting && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </button>

          <button 
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg overflow-hidden
              bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800
              text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50
              transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg
              active:scale-95"
          >
            {isExporting && exportType === 'pdf' ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowDownTrayIcon className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-1" />
            )}
            PDF
            {exportType === 'pdf' && isExporting && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </button>

          {/* Dil Seçici */}
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 text-sm font-medium rounded-lg
              bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800
              text-white border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg
              cursor-pointer appearance-none animate-gradient"
          >
            <option value="tr" className="bg-indigo-700">🇹🇷 Türkçe</option>
            <option value="en" className="bg-indigo-700">🇬🇧 English</option>
          </select>

          {/* Para Birimi Seçici */}
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="px-4 py-2 text-sm font-medium rounded-lg
              bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800
              text-white border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
              transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg
              cursor-pointer appearance-none animate-gradient"
          >
            <option value="TRY" className="bg-purple-700">₺ Türk Lirası</option>
            <option value="USD" className="bg-purple-700">$ USD</option>
            <option value="EUR" className="bg-purple-700">€ Euro</option>
            <option value="GBP" className="bg-purple-700">£ Pound</option>
          </select>
        </div>
      </div>

      {/* Filtre Bölümü */}
      <div className="mb-6 flex items-center space-x-4">
        {/* Yıl Filtresi */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {translations[language].year}
          </label>
          <select 
            value={filters.year}
            onChange={(e) => setFilters({...filters, year: Number(e.target.value) || ''})}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{translations[language].allYears}</option>
            {[2024, 2023, 2022].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Ay Filtresi */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {translations[language].month}
          </label>
          <select 
            value={filters.month}
            onChange={(e) => setFilters({...filters, month: Number(e.target.value) || ''})}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{translations[language].allMonths}</option>
            {Array.from({length: 12}, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>
                {new Date(2024, month - 1, 1).toLocaleString(language, { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        {/* Ülke Filtresi */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {translations[language].country}
          </label>
          <select 
            value={filters.country}
            onChange={(e) => setFilters({...filters, country: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{translations[language].allCountries}</option>
            {[...new Set(mockData.recentTransactions.map(t => t.country))].map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Kurum Filtresi */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {translations[language].institution}
          </label>
          <select 
            value={filters.institution}
            onChange={(e) => setFilters({...filters, institution: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{translations[language].allInstitutions}</option>
            {[...new Set(mockData.recentTransactions.map(t => t.institution))].map(institution => (
              <option key={institution} value={institution}>{institution}</option>
            ))}
          </select>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Gelir İstatistikleri */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {translations[language].totalIncome} ({filters.country || translations[language].allCountries})
              </p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(filteredSummary.income)}
              </p>
            </div>
            <div className="flex-shrink-0 p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/20">
              <CurrencyDollarIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Gider İstatistikleri */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {translations[language].totalExpense} ({filters.country || translations[language].allCountries})
              </p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(filteredSummary.expense)}
              </p>
            </div>
            <div className="flex-shrink-0 p-3 rounded-full bg-rose-100 dark:bg-rose-900/20">
              <ArrowTrendingDownIcon className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
        </div>

        {/* Net Gelir */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Gelir</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(filteredSummary.income - filteredSummary.expense)}
              </p>
            </div>
            <div className="flex-shrink-0 p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <DocumentChartBarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* İşlem Sayısı */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">İşlem Sayısı</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {filteredTransactions.length}
              </p>
            </div>
            <div className="flex-shrink-0 p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
              <BuildingOfficeIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Son İşlemler Tablosu */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {translations[language].recentTransactions}
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
                  Ülke
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
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.institution}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatCurrency(transaction.amount)}
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
