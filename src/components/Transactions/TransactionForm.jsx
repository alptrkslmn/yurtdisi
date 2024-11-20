import React, { useState } from 'react';
import { 
  CurrencyDollarIcon, BuildingOfficeIcon,
  DocumentIcon, XMarkIcon
} from '@heroicons/react/24/outline';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    currency: 'TRY',
    category: '',
    institution: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    attachments: []
  });

  // Demo verisi
  const categories = [
    { id: 1, name: 'Eğitim Giderleri', type: 'expense' },
    { id: 2, name: 'Sağlık Giderleri', type: 'expense' },
    { id: 3, name: 'Bağışlar', type: 'donation' },
    { id: 4, name: 'Kira Gelirleri', type: 'income' }
  ];

  const currencies = [
    { code: 'TRY', name: 'Türk Lirası', symbol: '₺' },
    { code: 'USD', name: 'Amerikan Doları', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'İngiliz Sterlini', symbol: '£' }
  ];

  const institutions = [
    { id: 1, name: 'Ankara Eğitim Merkezi', country: 'Türkiye' },
    { id: 2, name: 'İstanbul Sağlık Merkezi', country: 'Türkiye' },
    { id: 3, name: 'Berlin Kültür Merkezi', country: 'Almanya' }
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* İşlem Türü */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">İşlem Türü</h2>
          <div className="grid grid-cols-3 gap-4">
            {['income', 'expense', 'donation'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type }))}
                className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors
                  ${formData.type === type
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'border-dark-200 dark:border-dark-700 hover:border-primary-500 dark:hover:border-primary-500'
                  }`}
              >
                {type === 'income' && 'Gelir'}
                {type === 'expense' && 'Gider'}
                {type === 'donation' && 'Bağış'}
              </button>
            ))}
          </div>
        </div>

        {/* Tutar ve Para Birimi */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Tutar Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Tutar</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CurrencyDollarIcon className="h-5 w-5 text-dark-400" />
                </div>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  className="input pl-10"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            <div>
              <label className="label">Para Birimi</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                className="input"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name} ({currency.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Kategori ve Kurum */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Detay Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Kategori</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="input"
              >
                <option value="">Kategori Seçin</option>
                {categories
                  .filter(cat => cat.type === formData.type)
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="label">Kurum</label>
              <select
                value={formData.institution}
                onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                className="input"
              >
                <option value="">Kurum Seçin</option>
                {institutions.map((institution) => (
                  <option key={institution.id} value={institution.id}>
                    {institution.name} ({institution.country})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tarih ve Açıklama */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Diğer Bilgiler</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Tarih</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="input"
              />
            </div>
            <div>
              <label className="label">Açıklama</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="input h-24 resize-none"
                placeholder="İşlem açıklaması..."
              />
            </div>
          </div>
        </div>

        {/* Dosya Ekleri */}
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Dosya Ekleri</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-dark-800 text-dark rounded-lg border-2 border-dashed border-dark-300 dark:border-dark-600 cursor-pointer hover:border-primary-500 dark:hover:border-primary-500">
                <DocumentIcon className="h-12 w-12 text-dark-400" />
                <span className="mt-2 text-sm text-dark-500">Dosya eklemek için tıklayın veya sürükleyin</span>
                <input type="file" className="hidden" multiple onChange={handleFileChange} />
              </label>
            </div>

            {/* Eklenen Dosyalar */}
            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                {formData.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-dark-50 dark:bg-dark-800 rounded-lg"
                  >
                    <span className="text-sm truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="p-1 hover:text-red-600"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Butonları */}
        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-secondary">
            İptal
          </button>
          <button type="submit" className="btn btn-primary">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
