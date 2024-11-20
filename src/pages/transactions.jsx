import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import TransactionList from '../components/Transactions/TransactionList';
import TransactionForm from '../components/Transactions/TransactionForm';

const TransactionsPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      {/* Başlık ve Butonlar */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">İşlemler</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          <PlusIcon className="h-5 w-5" />
          Yeni İşlem
        </button>
      </div>

      {/* İşlem Formu veya Listesi */}
      {showForm ? (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Yeni İşlem</h2>
            <button 
              onClick={() => setShowForm(false)}
              className="btn btn-ghost"
            >
              İptal
            </button>
          </div>
          <TransactionForm />
        </>
      ) : (
        <TransactionList />
      )}
    </div>
  );
};

export default TransactionsPage;
