import React, { useState, useEffect } from 'react';
import {
  ArrowPathIcon,
  DocumentArrowDownIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
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
      ['Finansal Özet'],
      ['Toplam Gelir', data.summaryData.totalIncome],
      ['Toplam Gider', data.summaryData.totalExpense],
      ['Devreden', data.summaryData.balance],
      [],
      ['Gelir Kalemleri'],
      ['Kalem Adı', 'Tutar'],
      ...data.accountingEntries.filter(item => item.type === 'income').map(item => [item.description, item.amount]),
      ['Toplam', data.summaryData.totalIncome],
      [],
      ['Gider Kalemleri'],
      ['Kalem Adı', 'Tutar'],
      ...data.accountingEntries.filter(item => item.type === 'expense').map(item => [item.description, item.amount]),
      ['Toplam', data.summaryData.totalExpense]
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
    XLSX.utils.book_append_sheet(wb, ws, 'Rapor');
    XLSX.writeFile(wb, 'hudayi_rapor.xlsx');
  };

  const handlePdfExport = () => {
    const doc = new jsPDF();
    
    // Başlık
    doc.setFontSize(16);
    doc.text('Hudayi Finansal Rapor', 14, 20);
    
    // Özet Tablosu
    doc.setFontSize(12);
    doc.text('Finansal Özet', 14, 30);
    
    const summaryTableData = [
      ['Toplam Gelir', formatCurrency(data.summaryData.totalIncome)],
      ['Toplam Gider', formatCurrency(data.summaryData.totalExpense)],
      ['Devreden', formatCurrency(data.summaryData.balance)]
    ];
    
    doc.autoTable({
      startY: 35,
      head: [['Başlık', 'Tutar']],
      body: summaryTableData,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 66, 66] }
    });
    
    // Gelir Tablosu
    doc.text('Gelir Kalemleri', 14, doc.lastAutoTable.finalY + 15);
    
    const incomeTableData = data.accountingEntries.filter(item => item.type === 'income').map(item => [
      item.description,
      formatCurrency(item.amount)
    ]);
    incomeTableData.push(['Toplam', formatCurrency(data.summaryData.totalIncome)]);
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Kalem Adı', 'Tutar']],
      body: incomeTableData,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 66, 66] }
    });
    
    // Gider Tablosu
    doc.text('Gider Kalemleri', 14, doc.lastAutoTable.finalY + 15);
    
    const expenseTableData = data.accountingEntries.filter(item => item.type === 'expense').map(item => [
      item.description,
      formatCurrency(item.amount)
    ]);
    expenseTableData.push(['Toplam', formatCurrency(data.summaryData.totalExpense)]);
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Kalem Adı', 'Tutar']],
      body: expenseTableData,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 66, 66] }
    });
    
    // PDF'i indir
    doc.save('hudayi_rapor.pdf');
  };

  // Filtreler değiştiğinde verileri güncelle
  useEffect(() => {
    handleRefresh();
  }, [filters]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Raporlar</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowPathIcon className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Yenileniyor...' : 'Yenile'}
          </button>
          <button
            onClick={handleExcelExport}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
          >
            <TableCellsIcon className="h-4 w-4 mr-1" />
            Excel
          </button>
          <button
            onClick={handlePdfExport}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
            PDF
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
                Yıl
              </label>
              <select
                id="year"
                name="year"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              >
                <option value="">Tüm Yıllar</option>
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
                Ay
              </label>
              <select
                id="month"
                name="month"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filters.month}
                onChange={(e) => setFilters({ ...filters, month: e.target.value })}
              >
                <option value="">Tüm Aylar</option>
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
                Ülke
              </label>
              <select
                id="country"
                name="country"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              >
                <option value="">Tüm Ülkeler</option>
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
                Kurum
              </label>
              <select
                id="organization"
                name="organization"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={filters.organization}
                onChange={(e) => setFilters({ ...filters, organization: e.target.value })}
              >
                <option value="">Tüm Kurumlar</option>
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

      {/* Ön Muhasebe İşlemleri */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Ön Muhasebe İşlemleri</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tarih
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  İşlem No
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Alt Kategori
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Açıklama
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ödeme Yöntemi
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tutar
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Durum
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {data.accountingEntries.map((entry, index) => (
                <tr key={entry.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {new Date(entry.date).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {entry.documentNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {entry.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {entry.subCategory}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                    {entry.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {entry.paymentMethod}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                    entry.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {formatCurrency(entry.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entry.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : entry.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    }`}>
                      {entry.status === 'completed' ? 'Tamamlandı' : 
                       entry.status === 'pending' ? 'Beklemede' : 'Başarısız'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Genel Özet */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-lg font-medium text-gray-900 dark:text-white">Toplam Gelir</div>
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
                <div className="text-lg font-medium text-gray-900 dark:text-white">Toplam Gider</div>
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
                <div className="text-lg font-medium text-gray-900 dark:text-white">Devreden</div>
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
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Gelir Kalemleri</h2>
          </div>
          <div className="p-6">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 py-3 font-medium text-gray-900 dark:text-white">
                <div className="w-12">Sayı</div>
                <div>Kalem Adı</div>
                <div className="text-right">Tutar</div>
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
                <div className="text-gray-900 dark:text-white">Toplam</div>
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
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Gider Kalemleri</h2>
          </div>
          <div className="p-6">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 py-3 font-medium text-gray-900 dark:text-white">
                <div className="w-12">Sayı</div>
                <div>Kalem Adı</div>
                <div className="text-right">Tutar</div>
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
                <div className="text-gray-900 dark:text-white">Toplam</div>
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
