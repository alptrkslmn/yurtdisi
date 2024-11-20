import React, { useState } from 'react';
import { 
  ChevronDownIcon, ChevronUpIcon,
  FunnelIcon, ArrowPathIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

const TransactionList = () => {
  const [filters, setFilters] = useState({
    type: '',
    dateRange: 'all',
    category: '',
    institution: '',
    currency: '',
    minAmount: '',
    maxAmount: ''
  });

  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });

  // Demo verisi
  const transactions = [
    {
      id: 1,
      type: 'expense',
      amount: 5000,
      currency: 'TRY',
      category: 'Eğitim Giderleri',
      institution: 'Ankara Eğitim Merkezi',
      date: '2024-01-15',
      description: 'Öğrenci bursları - Ocak 2024',
      attachments: 2,
      status: 'completed'
    },
    {
      id: 2,
      type: 'income',
      amount: 10000,
      currency: 'EUR',
      category: 'Bağışlar',
      institution: 'Berlin Kültür Merkezi',
      date: '2024-01-14',
      description: 'Yıllık bağış ödemesi',
      attachments: 1,
      status: 'pending'
    },
    // ... Daha fazla örnek veri eklenebilir
  ];

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUpIcon className="h-4 w-4" /> : 
      <ChevronDownIcon className="h-4 w-4" />;
  };

  const formatAmount = (amount, currency) => {
    const formatter = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency
    });
    return formatter.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'income':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'expense':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'donation':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'text-dark-600 bg-dark-50 dark:bg-dark-900/20';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'income':
        return 'Gelir';
      case 'expense':
        return 'Gider';
      case 'donation':
        return 'Bağış';
      default:
        return type;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'cancelled':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-dark-600 bg-dark-50 dark:bg-dark-900/20';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'pending':
        return 'Beklemede';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filtreler */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <FunnelIcon className="h-5 w-5" />
            Filtreler
          </h2>
          <button 
            onClick={() => setFilters({
              type: '',
              dateRange: 'all',
              category: '',
              institution: '',
              currency: '',
              minAmount: '',
              maxAmount: ''
            })}
            className="btn btn-ghost"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Sıfırla
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">İşlem Türü</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="input"
            >
              <option value="">Tümü</option>
              <option value="income">Gelir</option>
              <option value="expense">Gider</option>
              <option value="donation">Bağış</option>
            </select>
          </div>

          <div>
            <label className="label">Tarih Aralığı</label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
              className="input"
            >
              <option value="all">Tüm Zamanlar</option>
              <option value="today">Bugün</option>
              <option value="week">Bu Hafta</option>
              <option value="month">Bu Ay</option>
              <option value="year">Bu Yıl</option>
              <option value="custom">Özel Aralık</option>
            </select>
          </div>

          <div>
            <label className="label">Para Birimi</label>
            <select
              value={filters.currency}
              onChange={(e) => setFilters(prev => ({ ...prev, currency: e.target.value }))}
              className="input"
            >
              <option value="">Tümü</option>
              <option value="TRY">Türk Lirası (₺)</option>
              <option value="USD">Amerikan Doları ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">İngiliz Sterlini (£)</option>
            </select>
          </div>
        </div>
      </div>

      {/* İşlem Listesi */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">İşlem Listesi</h2>
          <button className="btn btn-secondary">
            <DocumentArrowDownIcon className="h-5 w-5" />
            Dışa Aktar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-dark-50 dark:bg-dark-800">
                <th 
                  className="px-4 py-2 text-left cursor-pointer hover:bg-dark-100 dark:hover:bg-dark-700"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    Tarih
                    {getSortIcon('date')}
                  </div>
                </th>
                <th 
                  className="px-4 py-2 text-left cursor-pointer hover:bg-dark-100 dark:hover:bg-dark-700"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center gap-1">
                    Tür
                    {getSortIcon('type')}
                  </div>
                </th>
                <th 
                  className="px-4 py-2 text-left cursor-pointer hover:bg-dark-100 dark:hover:bg-dark-700"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center gap-1">
                    Tutar
                    {getSortIcon('amount')}
                  </div>
                </th>
                <th 
                  className="px-4 py-2 text-left cursor-pointer hover:bg-dark-100 dark:hover:bg-dark-700"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-1">
                    Kategori
                    {getSortIcon('category')}
                  </div>
                </th>
                <th 
                  className="px-4 py-2 text-left cursor-pointer hover:bg-dark-100 dark:hover:bg-dark-700"
                  onClick={() => handleSort('institution')}
                >
                  <div className="flex items-center gap-1">
                    Kurum
                    {getSortIcon('institution')}
                  </div>
                </th>
                <th 
                  className="px-4 py-2 text-left cursor-pointer hover:bg-dark-100 dark:hover:bg-dark-700"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Durum
                    {getSortIcon('status')}
                  </div>
                </th>
                <th className="px-4 py-2 text-left">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr 
                  key={transaction.id}
                  className="border-b border-dark-100 dark:border-dark-700 hover:bg-dark-50 dark:hover:bg-dark-800"
                >
                  <td className="px-4 py-2">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-sm ${getTypeColor(transaction.type)}`}>
                      {getTypeText(transaction.type)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {formatAmount(transaction.amount, transaction.currency)}
                  </td>
                  <td className="px-4 py-2">
                    {transaction.category}
                  </td>
                  <td className="px-4 py-2">
                    {transaction.institution}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(transaction.status)}`}>
                      {getStatusText(transaction.status)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button className="btn btn-icon btn-ghost">
                        <DocumentArrowDownIcon className="h-5 w-5" />
                      </button>
                    </div>
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

export default TransactionList;
