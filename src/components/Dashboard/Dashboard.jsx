import React, { useState } from 'react';
import { 
  ArrowUpIcon, ArrowDownIcon, DocumentArrowDownIcon,
  DocumentTextIcon, ArrowPathIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  // Demo verisi
  const stats = [
    { name: 'Toplam Gelir', amount: '₺2,456,789', change: '+12.5%', type: 'positive' },
    { name: 'Toplam Gider', amount: '₺1,234,567', change: '+8.2%', type: 'negative' },
    { name: 'Toplam Bağış', amount: '₺987,654', change: '+15.3%', type: 'positive' },
    { name: 'Net Durum', amount: '₺1,222,222', change: '+18.7%', type: 'positive' },
  ];

  const categories = [
    { name: 'Eğitim', amount: '₺856,432', percentage: 35 },
    { name: 'Sağlık', amount: '₺567,890', percentage: 23 },
    { name: 'Sosyal Yardım', amount: '₺432,567', percentage: 18 },
    { name: 'Dini Hizmetler', amount: '₺345,678', percentage: 14 },
    { name: 'Diğer', amount: '₺245,678', percentage: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Filtreler */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input"
          >
            <option value="all">Tüm Zamanlar</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="input"
          >
            <option value="all">Tüm Ülkeler</option>
            <option value="tr">Türkiye</option>
            <option value="us">Amerika</option>
            <option value="de">Almanya</option>
          </select>

          <button className="btn btn-secondary">
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-2">
            <DocumentArrowDownIcon className="h-5 w-5" />
            Excel
          </button>
          <button className="btn btn-secondary flex items-center gap-2">
            <DocumentTextIcon className="h-5 w-5" />
            PDF
          </button>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="text-sm font-medium text-dark-500 dark:text-dark-400">
              {stat.name}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <div className="text-2xl font-semibold">{stat.amount}</div>
              <div className={`flex items-center text-sm font-medium
                ${stat.type === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
              >
                {stat.type === 'positive' ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Kategori Dağılımı */}
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Kategori Dağılımı</h2>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-sm font-medium">{category.amount}</span>
              </div>
              <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
