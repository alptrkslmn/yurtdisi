import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import Countries from './pages/Countries';
import Categories from './pages/Categories';
import Reports from './pages/Reports';

function App() {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-dark-primary">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/organizations" element={<Organizations />} />
                        <Route path="/countries" element={<Countries />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/reports" element={<Reports />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;
