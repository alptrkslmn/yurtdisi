import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

/**
 * Layout bileşenini Header ve Sidebar ile uyumlu hale getirdim
 * Ana içeriğin z-index değerini en düşük yaparak header ve sidebar'ın üstte kalmasını sağladım
 * Layout'taki z-index hiyerarşisini düzenledim
 * Layout yapısını basitleştirdim ve gereksiz z-index'leri kaldırdım
 */
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - En üst katman */}
      <Sidebar />
      
      {/* Header - Orta katman */}
      <Header />
      
      {/* Ana içerik - En altta, header'ın altında başlar */}
      <div className="md:pl-64 flex flex-col pt-16">
        <main className="flex-1">
          <div className="p-8 pt-16">
            <div className="px-4 sm:px-6 md:px-8 space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
