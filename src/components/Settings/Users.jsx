import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  UserIcon, 
  PencilIcon, 
  TrashIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/authContext';
import { ROLES, PERMISSIONS } from '../../constants/permissions';

const Users = () => {
  const { t } = useTranslation();
  const { hasPermission } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      role: ROLES.COUNTRY_COORDINATOR,
      country: 'TR',
      status: 'active'
    },
    {
      id: 2,
      name: 'Mehmet Demir',
      email: 'mehmet@example.com',
      role: ROLES.FINANCIAL_MANAGER,
      country: 'TR',
      status: 'active'
    },
    {
      id: 3,
      name: 'Hans Schmidt',
      email: 'hans@example.com',
      role: ROLES.BRANCH_MANAGER,
      country: 'DE',
      status: 'active'
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    country: '',
    password: '',
    confirmPassword: ''
  });

  const handleAddUser = () => {
    if (
      !newUser.name || 
      !newUser.email || 
      !newUser.role || 
      !newUser.country || 
      !newUser.password ||
      newUser.password !== newUser.confirmPassword
    ) {
      // TODO: Hata mesajı göster
      return;
    }

    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...newUser, id: user.id, status: user.status }
          : user
      ));
      setEditingUser(null);
    } else {
      setUsers([
        ...users,
        {
          id: Math.max(...users.map(u => u.id), 0) + 1,
          ...newUser,
          status: 'active'
        }
      ]);
    }

    setNewUser({
      name: '',
      email: '',
      role: '',
      country: '',
      password: '',
      confirmPassword: ''
    });
    setShowAddModal(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      country: user.country,
      password: '',
      confirmPassword: ''
    });
    setShowAddModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm(t('common.deleteConfirmation'))) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t('settings.users.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('settings.users.description')}
          </p>
        </div>
        {hasPermission(PERMISSIONS.USER.CREATE) && (
          <button
            onClick={() => {
              setEditingUser(null);
              setNewUser({
                name: '',
                email: '',
                role: '',
                country: '',
                password: '',
                confirmPassword: ''
              });
              setShowAddModal(true);
            }}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
              text-white rounded-lg hover:from-blue-600 hover:to-blue-800 
              transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            {t('settings.users.add')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md 
              transition-shadow duration-200 p-6 relative group"
          >
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {hasPermission(PERMISSIONS.USER.EDIT) && (
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
                    dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              )}
              {hasPermission(PERMISSIONS.USER.DELETE) && (
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 
                    dark:hover:text-red-300 transition-colors duration-200"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <UserIcon className="h-12 w-12 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </h3>
                <div className="mt-3 space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t(`roles.${user.role}`)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t(`countries.${user.country}`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {editingUser ? t('users.editUser') : t('users.addUser')}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('users.name')}
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={t('users.namePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('users.email')}
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={t('users.emailPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('users.role')}
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">{t('users.selectRole')}</option>
                  {Object.entries(ROLES).map(([key, value]) => (
                    <option key={key} value={value}>
                      {t(`roles.${value}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('users.country')}
                </label>
                <select
                  value={newUser.country}
                  onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">{t('users.selectCountry')}</option>
                  <option value="TR">{t('countries.TR')}</option>
                  <option value="DE">{t('countries.DE')}</option>
                  <option value="NL">{t('countries.NL')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('users.password')}
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={t('users.passwordPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('users.confirmPassword')}
                </label>
                <input
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder={t('users.confirmPasswordPlaceholder')}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 
                    rounded-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 
                    to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-md"
                >
                  {editingUser ? t('common.save') : t('common.add')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
