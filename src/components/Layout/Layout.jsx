import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';

/**
 * Layout bileşenini Header ve Sidebar ile uyumlu hale getirdim
 * Ana içeriğin z-index değerini en düşük yaparak header ve sidebar'ın üstte kalmasını sağladım
 * Layout'taki z-index hiyerarşisini düzenledim
 * Layout yapısını basitleştirdim ve gereksiz z-index'leri kaldırdım
 */
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - Fixed position */}
      <Sidebar />
      
      {/* Header - Fixed position */}
      <Header />
      
      {/* Main content - Consistent padding and spacing */}
      <div className="md:pl-64 flex flex-col">
        <main className="flex-1 pt-16">
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
