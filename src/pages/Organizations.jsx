import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function Organizations() {
    const { t } = useTranslation();
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
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('organizations.title')}</h1>
                    <button
                        onClick={handleOpenModal}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        {t('organizations.addNew')}
                    </button>
                </div>

                <div className="bg-white dark:bg-dark-secondary rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-accent">
                            <thead className="bg-gray-50 dark:bg-dark-accent">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">
                                        {t('organizations.name')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">
                                        {t('organizations.description')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">
                                        {t('organizations.country')}
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-dark-secondary uppercase tracking-wider">
                                        {t('common.actions')}
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
                                                title={t('common.edit')}
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(org.id)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                title={t('common.delete')}
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

            {/* Modal buraya eklenecek */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-dark-secondary rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            {currentOrganization ? t('organizations.edit') : t('organizations.create')}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('organizations.name')}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:border-dark-accent dark:text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('organizations.description')}
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:border-dark-accent dark:text-white"
                                        rows="3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('organizations.country')}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-dark-accent dark:border-dark-accent dark:text-white"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-dark-accent dark:text-white dark:border-dark-accent dark:hover:bg-dark-primary"
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {currentOrganization ? t('common.save') : t('common.create')}
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
