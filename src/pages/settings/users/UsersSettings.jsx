import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const UsersSettings = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'Alp Özel', 
      email: 'alp@hudayi.com', 
      role: 'Admin', 
      institution: 'Hudayi Vakfı',
      active: true 
    },
    { 
      id: 2, 
      name: 'Mehmet Yılmaz', 
      email: 'mehmet@hudayi.com', 
      role: 'Editor', 
      institution: 'Almanya Eğitim Merkezi',
      active: true 
    },
    { 
      id: 3, 
      name: 'Ayşe Demir', 
      email: 'ayse@hudayi.com', 
      role: 'Viewer', 
      institution: 'Paris Kültür Derneği',
      active: false 
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    // Modal veya form açma işlemi
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    // Düzenleme modalını aç
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, active: !u.active } : u
    ));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('sidebar.menu.users')}
        </h1>
        <button 
          onClick={handleAddUser}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          {t('common.add')}
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-600 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">{t('common.name')}</th>
              <th scope="col" className="px-6 py-3">{t('common.email')}</th>
              <th scope="col" className="px-6 py-3">{t('common.role')}</th>
              <th scope="col" className="px-6 py-3">{t('common.institution')}</th>
              <th scope="col" className="px-6 py-3">{t('common.status')}</th>
              <th scope="col" className="px-6 py-3">{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user.id} 
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.institution}</td>
                <td className="px-6 py-4">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.active ? t('common.active') : t('common.inactive')}
                  </span>
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  <button 
                    onClick={() => handleEditUser(user)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => toggleUserStatus(user.id)}
                    className={`px-2 py-1 rounded-md text-xs ${
                      user.active 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {user.active ? t('common.deactivate') : t('common.activate')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersSettings;