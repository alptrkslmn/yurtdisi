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
import { useTranslation } from 'react-i18next';

// Para birimi ayarları
const currencySettings = {
  TRY: { symbol: '₺', locale: 'tr-TR' },
  USD: { symbol: '$', locale: 'en-US' },
  EUR: { symbol: '€', locale: 'de-DE' },
  GBP: { symbol: '£', locale: 'en-GB' }
};

function Dashboard() {
  const { t } = useTranslation();
  
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

  // Örnek veri
  const mockData = {
    stats: [
      {
        id: 1,
        name: t('dashboard.stats.totalIncome'),
        value: '₺2,435,890',
        change: '+12.5%',
        trend: 'up',
        icon: CurrencyDollarIcon,
        color: 'emerald'
      },
      {
        id: 2,
        name: t('dashboard.stats.totalExpense'),
        value: '₺1,874,320',
        change: '+8.2%',
        trend: 'up',
        icon: ArrowTrendingDownIcon,
        color: 'rose'
      },
      {
        id: 3,
        name: t('dashboard.stats.activeInstitutions'),
        value: '24',
        change: '+2',
        trend: 'up',
        icon: BuildingOfficeIcon,
        color: 'blue'
      },
      {
        id: 4,
        name: t('dashboard.stats.monthlyReport'),
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
        institution: t('institutions.DE_1'),
        country: t('countries.DE'),
        type: t('common.type.income'),
        amount: 12450,
        status: t('dashboard.status.completed'),
        date: '2024-03-21'
      },
      {
        id: 2,
        institution: t('institutions.FR_1'),
        country: t('countries.FR'),
        type: t('common.type.expense'),
        amount: 8720,
        status: t('dashboard.status.pending'),
        date: '2024-03-20'
      },
      {
        id: 3,
        institution: t('institutions.GB_1'),
        country: t('countries.GB'),
        type: t('common.type.income'),
        amount: 15890,
        status: t('dashboard.status.completed'),
        date: '2024-03-19'
      },
      {
        id: 4,
        institution: t('institutions.US_1'),
        country: t('countries.US'),
        type: t('common.type.expense'),
        amount: 22340,
        status: t('dashboard.status.failed'),
        date: '2024-03-18'
      },
    ]
  };

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
      .filter(t => t.type === t('common.type.income'))
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = filteredTransactions
      .filter(t => t.type === t('common.type.expense'))
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
    const { symbol, locale } = currencySettings[filters.currency];
    return new Intl.NumberFormat(locale, { 
      style: 'currency', 
      currency: filters.currency 
    }).format(amount);
  };

  // Excel'e aktarma fonksiyonu
  const exportToExcel = () => {
    // Verileri Excel formatına dönüştür
    const transactionData = filteredTransactions.map(item => ({
      [t('common.table.institution')]: item.institution,
      [t('common.table.country')]: item.country,
      [t('common.table.type')]: item.type,
      [t('common.table.amount')]: item.amount,
      [t('common.table.status')]: item.status,
      [t('common.table.date')]: new Date(item.date).toLocaleDateString('tr-TR')
    }));

    const statsData = mockData.stats.map(item => ({
      [t('common.table.indicator')]: item.name,
      [t('common.table.value')]: item.value,
      [t('common.table.change')]: item.change
    }));

    // İki sayfa oluştur: İstatistikler ve İşlemler
    const wb = XLSX.utils.book_new();
    
    const ws1 = XLSX.utils.json_to_sheet(statsData);
    XLSX.utils.book_append_sheet(wb, ws1, t('dashboard.export.statistics'));
    
    const ws2 = XLSX.utils.json_to_sheet(transactionData);
    XLSX.utils.book_append_sheet(wb, ws2, t('dashboard.export.recentTransactions'));

    // Excel dosyasını indir
    XLSX.writeFile(wb, "Hudayi_Report.xlsx");
  };

  // PDF'e aktarma fonksiyonu
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Başlık
    doc.setFontSize(20);
    doc.text(t('dashboard.export.report'), 14, 22);
    doc.setFontSize(12);
    doc.text(new Date().toLocaleDateString('tr-TR'), 14, 32);

    // İstatistikler
    doc.setFontSize(16);
    doc.text(t('dashboard.export.statistics'), 14, 45);
    
    const statsData = mockData.stats.map(item => [
      item.name,
      item.value,
      item.change
    ]);

    doc.autoTable({
      startY: 50,
      head: [[
        t('common.table.indicator'),
        t('common.table.value'),
        t('common.table.change')
      ]],
      body: statsData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }
    });

    // Son İşlemler
    doc.setFontSize(16);
    doc.text(t('dashboard.export.recentTransactions'), 14, doc.autoTable.previous.finalY + 20);

    const transactionData = filteredTransactions.map(item => [
      item.institution,
      item.country,
      item.type,
      formatCurrency(item.amount),
      item.status,
      new Date(item.date).toLocaleDateString('tr-TR')
    ]);

    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 25,
      head: [[
        t('common.table.institution'),
        t('common.table.country'),
        t('common.table.type'),
        t('common.table.amount'),
        t('common.table.status'),
        t('common.table.date')
      ]],
      body: transactionData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }
    });

    // PDF'i indir
    doc.save("Hudayi_Report.pdf");
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

  const handleFilterChange = (field, value) => {
    setFilters({...filters, [field]: value});
  };

  const years = Array.from({length: 5}, (_, i) => new Date().getFullYear() - i);
  const countries = [...new Set(mockData.recentTransactions.map(t => t.country))];
  const institutions = [...new Set(mockData.recentTransactions.map(t => t.institution))];

  const totalIncome = filteredTransactions
    .filter(t => t.type === t('common.type.income'))
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === t('common.type.expense'))
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-6 pt-16">
      {/* Üst Başlık ve Butonlar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t('dashboard.summary')}
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleRefresh}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isRefreshing}
          >
            <ArrowPathIcon className={`-ml-1 mr-2 h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {t('dashboard.actions.refresh')}
          </button>

          {/* Excel Butonu */}
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
            {t('dashboard.export.excel')}
            {exportType === 'excel' && isExporting && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </button>

          {/* PDF Butonu */}
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
            {t('dashboard.export.pdf')}
            {exportType === 'pdf' && isExporting && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </button>
        </div>
      </div>

      {/* Filtre Bölümü */}
      <div className="mb-6 flex items-center space-x-4">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('dashboard.filters.year')}
          </label>
          <select
            id="year"
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('dashboard.filters.allYears')}</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('dashboard.filters.month')}
          </label>
          <select
            id="month"
            value={filters.month}
            onChange={(e) => handleFilterChange('month', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('dashboard.filters.allMonths')}</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2024, i).toLocaleString('tr-TR', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('dashboard.filters.country')}
          </label>
          <select
            id="country"
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('dashboard.filters.allCountries')}</option>
            {countries.map(country => (
              <option key={country} value={country}>{t(`countries.${country}`)}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="institution" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('dashboard.filters.institution')}
          </label>
          <select
            id="institution"
            value={filters.institution}
            onChange={(e) => handleFilterChange('institution', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('dashboard.filters.allInstitutions')}</option>
            {institutions.map(institution => (
              <option key={institution} value={institution}>{institution}</option>
            ))}
          </select>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Toplam Gelir */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {t('dashboard.stats.totalIncome')}
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(totalIncome)}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Toplam Gider */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ArrowTrendingDownIcon className="h-8 w-8 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {t('dashboard.stats.totalExpense')}
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(totalExpense)}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Net Gelir */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentChartBarIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {t('dashboard.stats.netIncome')}
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(totalIncome - totalExpense)}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        {/* İşlem Sayısı */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BuildingOfficeIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {t('dashboard.stats.transactionCount')}
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {filteredTransactions.length}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Son İşlemler Tablosu */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {t('dashboard.recentTransactions')}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.table.institution')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.table.country')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.table.type')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.table.amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.table.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.table.date')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.institution}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.type}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    transaction.amount >= 0 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        transaction.status === t('dashboard.status.completed')
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                          : transaction.status === t('dashboard.status.pending')
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400'
                      }`}
                    >
                      {transaction.status}
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