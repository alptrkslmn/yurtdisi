import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

const CurrencySettings = () => {
  const { t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState('TRY');
  const [symbolPosition, setSymbolPosition] = useState('before');
  const [decimalSeparator, setDecimalSeparator] = useState(',');
  const [thousandSeparator, setThousandSeparator] = useState('.');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCurrencies, setActiveCurrencies] = useState([
    { code: 'TRY', symbol: '₺', name: 'Türk Lirası' },
    { code: 'USD', symbol: '$', name: 'Amerikan Doları' },
  ]);

  // Tüm para birimleri currencies.all'dan gelecek
  const allCurrencies = t('common.currencies.all', { returnObjects: true });

  // Arama sonuçlarını filtrele
  const filteredCurrencies = Object.entries(allCurrencies)
    .filter(([code]) => !activeCurrencies.some(c => c.code === code))
    .filter(([code, currency]) => 
      code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(`common.currencies.${code}.name`).toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(([code, currency]) => ({
      code,
      name: t(`common.currencies.${code}.name`),
      symbol: currency.symbol
    }));

  const handleAddCurrency = (currencyData) => {
    if (activeCurrencies.some(c => c.code === currencyData.code)) {
      return;
    }
    setActiveCurrencies([...activeCurrencies, currencyData]);
    setIsModalOpen(false);
    setSearchQuery('');
  };

  const handleRemoveCurrency = (codeToRemove) => {
    if (activeCurrencies.length <= 2) {
      alert(t('settings.currencySettings.management.minimumCurrencyError'));
      return;
    }
    if (selectedCurrency === codeToRemove) {
      alert(t('settings.currencySettings.management.cannotRemoveSelected'));
      return;
    }
    setActiveCurrencies(activeCurrencies.filter(c => c.code !== codeToRemove));
  };

  const handleSave = () => {
    console.log({
      currency: selectedCurrency,
      symbolPosition,
      decimalSeparator,
      thousandSeparator,
      activeCurrencies
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          {t('settings.currencySettings.title')}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('settings.currencySettings.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Sol Kolon: Para Birimi Yönetimi */}
        <div className="space-y-6">
          {/* Aktif Para Birimleri */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.currencySettings.management.active')}
              </label>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                {t('settings.currencySettings.management.addCurrency')}
              </button>
            </div>
            <div className="space-y-2">
              {activeCurrencies.map((currency) => (
                <div 
                  key={currency.code}
                  className={`flex items-center justify-between p-3 rounded-md border ${
                    selectedCurrency === currency.code
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-medium">{currency.symbol}</span>
                    <span>{t(`common.currencies.${currency.code}.name`)}</span>
                    <span className="text-sm text-gray-500">({currency.code})</span>
                  </div>
                  <button
                    onClick={() => handleRemoveCurrency(currency.code)}
                    className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    disabled={selectedCurrency === currency.code || activeCurrencies.length <= 2}
                  >
                    {t('settings.currencySettings.management.removeCurrency')}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Para Birimi Seçimi */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('settings.currencySettings.baseCurrency')}
            </label>
            <select
              id="currency"
              name="currency"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {activeCurrencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} - {t(`common.currencies.${currency.code}.name`)} ({currency.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sağ Kolon: Format Ayarları */}
        <div className="space-y-6">
          {/* Sembol Pozisyonu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('common.currency.position.title')}
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSymbolPosition('before')}
                className={`flex-1 px-4 py-2 rounded-md border ${
                  symbolPosition === 'before'
                    ? 'bg-indigo-600 text-white border-transparent'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {t('common.currency.position.before')}
              </button>
              <button
                onClick={() => setSymbolPosition('after')}
                className={`flex-1 px-4 py-2 rounded-md border ${
                  symbolPosition === 'after'
                    ? 'bg-indigo-600 text-white border-transparent'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {t('common.currency.position.after')}
              </button>
            </div>
          </div>

          {/* Ayraçlar */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="decimalSeparator" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('common.currency.separator.decimal')}
              </label>
              <select
                id="decimalSeparator"
                name="decimalSeparator"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                value={decimalSeparator}
                onChange={(e) => setDecimalSeparator(e.target.value)}
              >
                <option value=",">,</option>
                <option value=".">.</option>
              </select>
            </div>

            <div>
              <label htmlFor="thousandSeparator" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('common.currency.separator.thousand')}
              </label>
              <select
                id="thousandSeparator"
                name="thousandSeparator"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                value={thousandSeparator}
                onChange={(e) => setThousandSeparator(e.target.value)}
              >
                <option value=".">.</option>
                <option value=",">,</option>
                <option value=" ">Boşluk</option>
              </select>
            </div>
          </div>

          {/* Örnek Görünüm */}
          <div className="rounded-md border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">{t('common.currency.format')}:</span>{' '}
              <span className="font-mono text-lg">
                {symbolPosition === 'before' ? activeCurrencies.find(c => c.code === selectedCurrency)?.symbol : ''}
                1{thousandSeparator}234{decimalSeparator}56
                {symbolPosition === 'after' ? ` ${activeCurrencies.find(c => c.code === selectedCurrency)?.symbol}` : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {t('common.save')}
        </button>
      </div>

      {/* Para Birimi Ekleme Modalı */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Modal Arkaplanı */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)} />

            {/* Modal İçeriği */}
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setIsModalOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                  {t('settings.currencySettings.management.modal.title')}
                </h3>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('settings.currencySettings.management.modal.searchPlaceholder')}
                    className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    autoFocus
                  />
                </div>

                <div className="mt-4 max-h-[60vh] overflow-y-auto">
                  {filteredCurrencies.length > 0 ? (
                    <div className="space-y-1">
                      {filteredCurrencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => handleAddCurrency(currency)}
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-medium">{currency.symbol}</span>
                            <span>{t(`common.currencies.${currency.code}.name`)}</span>
                            <span className="text-sm text-gray-500">({currency.code})</span>
                          </div>
                          <PlusIcon className="h-5 w-5 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                      {t('settings.currencySettings.management.modal.noResults')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySettings;
