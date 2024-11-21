import React, { useState, useEffect } from 'react';
import {
  ArrowPathIcon,
  DocumentArrowDownIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useTranslation } from 'react-i18next';

const Reports = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    summaryData: {
      totalIncome: 1500000.00,
      totalExpense: 800000.00,
      balance: 700000.00
    },
    accountingEntries: [
      {
        id: 1,
        date: '2024-01-15',
        type: 'expense',
        category: 'Personel',
        subCategory: 'Maaş Ödemesi',
        description: 'Ocak 2024 Personel Maaşları',
        amount: 250000.00,
        status: 'completed',
        paymentMethod: 'Banka Transferi',
        documentNo: 'HR2024-001'
      },
      {
        id: 2,
        date: '2024-01-10',
        type: 'expense',
        category: 'Operasyonel',
        subCategory: 'Kira',
        description: 'Berlin Şubesi Kira Ödemesi',
        amount: 45000.00,
        status: 'completed',
        paymentMethod: 'Otomatik Ödeme',
        documentNo: 'OP2024-001'
      },
      {
        id: 3,
        date: '2024-01-05',
        type: 'income',
        category: 'Bağışlar',
        subCategory: 'Düzenli Bağış',
        description: 'Ocak Ayı Düzenli Bağış Ödemeleri',
        amount: 350000.00,
        status: 'completed',
        paymentMethod: 'Kredi Kartı',
        documentNo: 'DN2024-001'
      },
      {
        id: 4,
        date: '2024-01-03',
        type: 'expense',
        category: 'Yardımlar',
        subCategory: 'Eğitim Yardımı',
        description: 'Öğrenci Bursları Ödemesi',
        amount: 75000.00,
        status: 'completed',
        paymentMethod: 'Banka Transferi',
        documentNo: 'ED2024-001'
      },
      {
        id: 5,
        date: '2024-01-02',
        type: 'income',
        category: 'Kira Gelirleri',
        subCategory: 'İşyeri Kirası',
        description: 'Vakıf İşhanı Kira Gelirleri',
        amount: 180000.00,
        status: 'completed',
        paymentMethod: 'Banka Transferi',
        documentNo: 'KR2024-001'
      }
    ]
  });

  const [filters, setFilters] = useState({
    year: '',
    month: '',
    country: '',
    organization: ''
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Gerçek API çağrısı burada yapılacak
      // const response = await fetch('/api/reports?' + new URLSearchParams(filters));
      // const data = await response.json();
      
      // Şimdilik mock data kullanıyoruz
      setData({
        summaryData: {
          totalIncome: 1500000.00,
          totalExpense: 800000.00,
          balance: 700000.00
        },
        accountingEntries: [
          {
            id: 1,
            date: '2024-01-15',
            type: 'expense',
            category: 'Personel',
            subCategory: 'Maaş Ödemesi',
            description: 'Ocak 2024 Personel Maaşları',
            amount: 250000.00,
            status: 'completed',
            paymentMethod: 'Banka Transferi',
            documentNo: 'HR2024-001'
          },
          {
            id: 2,
            date: '2024-01-10',
            type: 'expense',
            category: 'Operasyonel',
            subCategory: 'Kira',
            description: 'Berlin Şubesi Kira Ödemesi',
            amount: 45000.00,
            status: 'completed',
            paymentMethod: 'Otomatik Ödeme',
            documentNo: 'OP2024-001'
          },
          {
            id: 3,
            date: '2024-01-05',
            type: 'income',
            category: 'Bağışlar',
            subCategory: 'Düzenli Bağış',
            description: 'Ocak Ayı Düzenli Bağış Ödemeleri',
            amount: 350000.00,
            status: 'completed',
            paymentMethod: 'Kredi Kartı',
            documentNo: 'DN2024-001'
          },
          {
            id: 4,
            date: '2024-01-03',
            type: 'expense',
            category: 'Yardımlar',
            subCategory: 'Eğitim Yardımı',
            description: 'Öğrenci Bursları Ödemesi',
            amount: 75000.00,
            status: 'completed',
            paymentMethod: 'Banka Transferi',
            documentNo: 'ED2024-001'
          },
          {
            id: 5,
            date: '2024-01-02',
            type: 'income',
            category: 'Kira Gelirleri',
            subCategory: 'İşyeri Kirası',
            description: 'Vakıf İşhanı Kira Gelirleri',
            amount: 180000.00,
            status: 'completed',
            paymentMethod: 'Banka Transferi',
            documentNo: 'KR2024-001'
          }
        ]
      });
    } catch (error) {
      console.error('Veri yenileme hatası:', error);
      // Hata durumunda kullanıcıya bilgi verilebilir
    } finally {
      setIsLoading(false);
    }
  };

  const handleExcelExport = () => {
    // Excel dosyası için worksheet'ler oluştur
    const wb = XLSX.utils.book_new();

    // Özet sayfası
    const summaryData = [
      [t('reports.summary.title')],
      [t('reports.summary.totalIncome'), data.summaryData.totalIncome],
      [t('reports.summary.totalExpense'), data.summaryData.totalExpense],
      [t('reports.summary.balance'), data.summaryData.balance],
      [],
      [t('reports.summary.income')],
      [t('common.table.category'), t('common.table.amount')],
      ...data.accountingEntries.filter(item => item.type === 'income').map(item => [item.description, item.amount]),
      [t('reports.summary.total'), data.summaryData.totalIncome],
      [],
      [t('reports.summary.expense')],
      [t('common.table.category'), t('common.table.amount')],
      ...data.accountingEntries.filter(item => item.type === 'expense').map(item => [item.description, item.amount]),
      [t('reports.summary.total'), data.summaryData.totalExpense]
    ];

    const ws = XLSX.utils.aoa_to_sheet(summaryData);

    // Stil ayarları
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!ws[cell_ref]) continue;
        
        // Para birimi formatı
        if (typeof ws[cell_ref].v === 'number') {
          ws[cell_ref].z = '#,##0.00₺';
        }
      }
    }

    // Excel dosyasına ekle ve indir
    XLSX.utils.book_append_sheet(wb, ws, t('reports.summary.title'));
    XLSX.writeFile(wb, `${t('reports.summary.title')}.xlsx`);
  };

  const handlePdfExport = () => {
    const doc = new jsPDF();
    
    // Başlık
    doc.setFontSize(16);
    doc.text(t('reports.title'), 14, 20);
    
    // Özet Tablosu
    doc.setFontSize(12);
    doc.text(t('reports.summary.title'), 14, 30);
    
    const summaryTableData = [
      [t('reports.summary.totalIncome'), formatCurrency(data.summaryData.totalIncome)],
      [t('reports.summary.totalExpense'), formatCurrency(data.summaryData.totalExpense)],
      [t('reports.summary.balance'), formatCurrency(data.summaryData.balance)]
    ];
    
    doc.autoTable({
      startY: 35,
      head: [[t('common.table.category'), t('common.table.amount')]],
      body: summaryTableData,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 66, 66] }
    });
    
    // Gelir Tablosu
    doc.text(t('reports.summary.income'), 14, doc.lastAutoTable.finalY + 15);
    
    const incomeTableData = data.accountingEntries.filter(item => item.type === 'income').map(item => [
      item.description,
      formatCurrency(item.amount)
    ]);
    incomeTableData.push([t('reports.summary.total'), formatCurrency(data.summaryData.totalIncome)]);
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [[t('common.table.category'), t('common.table.amount')]],
      body: incomeTableData,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 66, 66] }
    });
    
    // Gider Tablosu
    doc.text(t('reports.summary.expense'), 14, doc.lastAutoTable.finalY + 15);
    
    const expenseTableData = data.accountingEntries.filter(item => item.type === 'expense').map(item => [
      item.description,
      formatCurrency(item.amount)
    ]);
    expenseTableData.push([t('reports.summary.total'), formatCurrency(data.summaryData.totalExpense)]);
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [[t('common.table.category'), t('common.table.amount')]],
      body: expenseTableData,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 66, 66] }
    });
    
    // PDF'i indir
    doc.save(`${t('reports.title')}.pdf`);
  };

  // Filtreler değiştiğinde verileri güncelle
  useEffect(() => {
    handleRefresh();
  }, [filters]);

  return (
    <div className="p-6 pt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t('reports.title')}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowPathIcon className={`h-5 w-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {t('common.actions.refresh')}
          </button>
          <button
            onClick={handleExcelExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <TableCellsIcon className="h-5 w-5 mr-2" />
            {t('common.actions.export.excel')}
          </button>
          <button
            onClick={handlePdfExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            {t('common.actions.export.pdf')}
          </button>
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Yıl Seçimi */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('dashboard.filters.year')}
              </label>
              <select
                id="year"
                name="year"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              >
                <option value="">{t('reports.filters.allYears')}</option>
                {[2024, 2023, 2022, 2021, 2020].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Ay Seçimi */}
            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('dashboard.filters.month')}
              </label>
              <select
                id="month"
                name="month"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filters.month}
                onChange={(e) => setFilters({ ...filters, month: e.target.value })}
              >
                <option value="">{t('reports.filters.allMonths')}</option>
                {[
                  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
                ].map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Ülke Seçimi */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('dashboard.filters.country')}
              </label>
              <select
                id="country"
                name="country"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              >
                <option value="">{t('reports.filters.allCountries')}</option>
                {['Türkiye', 'Almanya', 'Fransa', 'Hollanda', 'Belçika'].map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Kurum Seçimi */}
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('dashboard.filters.institution')}
              </label>
              <select
                id="organization"
                name="organization"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filters.organization}
                onChange={(e) => setFilters({ ...filters, organization: e.target.value })}
              >
                <option value="">{t('reports.filters.allInstitutions')}</option>
                {['Hudayi Vakfı', 'Hudayi Derneği', 'İnsani Yardım Derneği'].map((org) => (
                  <option key={org} value={org}>
                    {org}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Genel Özet */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('reports.summary.totalIncome')}
                </div>
                <div className="mt-1 text-2xl font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(data.summaryData.totalIncome)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('reports.summary.totalExpense')}
                </div>
                <div className="mt-1 text-2xl font-semibold text-red-600 dark:text-red-400">
                  {formatCurrency(data.summaryData.totalExpense)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('reports.summary.balance')}
                </div>
                <div className="mt-1 text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {formatCurrency(data.summaryData.balance)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gelir ve Gider Detayları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gelir Detayları */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {t('reports.income.title')}
            </h2>
          </div>
          <div className="p-6">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 py-3 font-medium text-gray-900 dark:text-white">
                <div className="w-12">{t('common.table.no')}</div>
                <div>{t('common.table.category')}</div>
                <div className="text-right">{t('common.table.amount')}</div>
              </div>
              {data.accountingEntries.filter(item => item.type === 'income').map((category, index) => (
                <div key={index} className="grid grid-cols-[auto_1fr_auto] gap-4 py-3">
                  <div className="w-12 text-gray-500 dark:text-gray-400">{index + 1}.</div>
                  <div className="text-gray-700 dark:text-gray-300">{category.description}</div>
                  <div className="text-right text-green-600 dark:text-green-400 font-medium">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 py-3 font-medium">
                <div className="w-12"></div>
                <div className="text-gray-900 dark:text-white">{t('reports.income.total')}</div>
                <div className="text-right text-green-600 dark:text-green-400">
                  {formatCurrency(data.summaryData.totalIncome)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gider Detayları */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {t('reports.expense.title')}
            </h2>
          </div>
          <div className="p-6">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 py-3 font-medium text-gray-900 dark:text-white">
                <div className="w-12">{t('common.table.no')}</div>
                <div>{t('common.table.category')}</div>
                <div className="text-right">{t('common.table.amount')}</div>
              </div>
              {data.accountingEntries.filter(item => item.type === 'expense').map((category, index) => (
                <div key={index} className="grid grid-cols-[auto_1fr_auto] gap-4 py-3">
                  <div className="w-12 text-gray-500 dark:text-gray-400">{index + 1}.</div>
                  <div className="text-gray-700 dark:text-gray-300">{category.description}</div>
                  <div className="text-right text-red-600 dark:text-red-400 font-medium">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 py-3 font-medium">
                <div className="w-12"></div>
                <div className="text-gray-900 dark:text-white">{t('reports.expense.total')}</div>
                <div className="text-right text-red-600 dark:text-red-400">
                  {formatCurrency(data.summaryData.totalExpense)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
