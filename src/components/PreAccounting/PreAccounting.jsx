import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const PreAccounting = () => {
  const { t } = useTranslation();

  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      documentNumber: 'DOC001',
      category: t('preAccounting.categories.income'),
      subCategory: t('preAccounting.subCategories.donation'),
      description: 'Ocak ayı bağış geliri',
      paymentMethod: t('preAccounting.paymentMethods.bankTransfer'),
      amount: 5000,
      status: t('preAccounting.status.completed')
    },
    {
      id: 2,
      date: '2024-01-16',
      documentNumber: 'DOC002',
      category: t('preAccounting.categories.expense'),
      subCategory: t('preAccounting.subCategories.rent'),
      description: 'Ofis kirası',
      paymentMethod: t('preAccounting.paymentMethods.automaticPayment'),
      amount: -2500,
      status: t('preAccounting.status.completed')
    }
  ];

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t('preAccounting.title')}
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {t('preAccounting.description')}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-1" />
            {t('preAccounting.newTransaction')}
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                      {t('preAccounting.table.date')}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      {t('preAccounting.table.documentNumber')}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      {t('preAccounting.table.category')}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      {t('preAccounting.table.subCategory')}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      {t('preAccounting.table.description')}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      {t('preAccounting.table.paymentMethod')}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      {t('preAccounting.table.amount')}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      {t('preAccounting.table.status')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 dark:text-white sm:pl-6">{transaction.date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">{transaction.documentNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">{transaction.category}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">{transaction.subCategory}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">{transaction.description}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">{transaction.paymentMethod}</td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm font-medium ${
                        transaction.amount >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.amount >= 0 ? '+' : ''}{transaction.amount} ₺
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          transaction.status === 'Tamamlandı'
                            ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreAccounting;
