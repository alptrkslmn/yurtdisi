import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function Organizations() {
    const [organizations, setOrganizations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOrganization, setCurrentOrganization] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        country: ''
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentOrganization(null);
        setFormData({ name: '', description: '', country: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kurum ekleme/düzenleme işlemleri buraya gelecek
        handleCloseModal();
    };

    const handleEdit = (org) => {
        setCurrentOrganization(org);
        setFormData({ name: org.name, description: org.description, country: org.country });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        // Kurum silme işlemleri buraya gelecek
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kurumlar</h1>
                    <button
                        onClick={handleOpenModal}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Yeni Kurum
                    </button>
                </div>

                <div className="bg-white dark:bg-dark-secondary rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-accent">
                            <thead className="bg-gray-50 dark:bg-dark-accent">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">
                                        Kurum Adı
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">
                                        Açıklama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">
                                        Ülke
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-dark-secondary divide-y divide-gray-200 dark:divide-dark-accent">
                                {organizations.map((org) => (
                                    <tr key={org.id} className="hover:bg-gray-50 dark:hover:bg-dark-accent transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {org.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-dark-accent">
                                            {org.description || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-dark-accent">
                                            {org.country}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(org)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(org.id)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Kurum Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-dark-secondary rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {currentOrganization ? 'Kurum Düzenle' : 'Yeni Kurum'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-dark-secondary mb-1">
                                    Kurum Adı
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:border-dark-accent dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-dark-secondary mb-1">
                                    Açıklama
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:border-dark-accent dark:text-white"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-dark-secondary mb-1">
                                    Ülke
                                </label>
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:border-dark-accent dark:text-white"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-gray-700 dark:text-dark-secondary hover:bg-gray-100 dark:hover:bg-dark-accent rounded-md transition-colors duration-200"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Kaydet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Organizations;
