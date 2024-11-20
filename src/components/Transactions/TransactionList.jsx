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
    }
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
          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="select"
          >
            <option value="">Tüm İşlem Türleri</option>
            <option value="income">Gelir</option>
            <option value="expense">Gider</option>
            <option value="donation">Bağış</option>
          </select>

          <select
            value={filters.dateRange}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
            className="select"
          >
            <option value="all">Tüm Tarihler</option>
            <option value="today">Bugün</option>
            <option value="week">Bu Hafta</option>
            <option value="month">Bu Ay</option>
            <option value="year">Bu Yıl</option>
          </select>

          <select
            value={filters.currency}
            onChange={(e) => setFilters(prev => ({ ...prev, currency: e.target.value }))}
            className="select"
          >
            <option value="">Tüm Para Birimleri</option>
            <option value="TRY">Türk Lirası (₺)</option>
            <option value="USD">Amerikan Doları ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">İngiliz Sterlini (£)</option>
          </select>
        </div>
      </div>

      {/* İşlem Listesi */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-200 dark:border-dark-700">
                <th className="py-3 px-4 text-left">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center gap-1 font-medium"
                  >
                    Tarih
                    {getSortIcon('date')}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button
                    onClick={() => handleSort('type')}
                    className="flex items-center gap-1 font-medium"
                  >
                    Tür
                    {getSortIcon('type')}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button
                    onClick={() => handleSort('amount')}
                    className="flex items-center gap-1 font-medium"
                  >
                    Tutar
                    {getSortIcon('amount')}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">Kategori</th>
                <th className="py-3 px-4 text-left">Kurum</th>
                <th className="py-3 px-4 text-left">Durum</th>
                <th className="py-3 px-4 text-left">Ekler</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-dark-200 dark:border-dark-700 hover:bg-dark-50 dark:hover:bg-dark-800/50"
                >
                  <td className="py-3 px-4">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                      {getTypeText(transaction.type)}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {formatAmount(transaction.amount, transaction.currency)}
                  </td>
                  <td className="py-3 px-4">
                    {transaction.category}
                  </td>
                  <td className="py-3 px-4">
                    {transaction.institution}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusText(transaction.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {transaction.attachments > 0 && (
                      <button className="p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg">
                        <DocumentArrowDownIcon className="h-5 w-5" />
                      </button>
                    )}
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
