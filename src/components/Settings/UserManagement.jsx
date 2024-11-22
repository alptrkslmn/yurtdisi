import React, { useState } from 'react';
import { 
  PlusIcon, PencilSquareIcon, TrashIcon,
  CheckCircleIcon, XCircleIcon
} from '@heroicons/react/24/outline';

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Demo verisi
  const users = [
    { 
      id: 1, 
      name: 'Ahmet Yılmaz', 
      email: 'ahmet@example.com',
      role: 'country_coordinator',
      countries: ['Türkiye', 'Azerbaycan'],
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Mehmet Demir', 
      email: 'mehmet@example.com',
      role: 'institution_manager',
      countries: ['Almanya'],
      status: 'active'
    }
  ];

  const roles = [
    { id: 'admin', name: 'Admin' },
    { id: 'country_coordinator', name: 'Ülke Koordinatörü' },
    { id: 'financial_manager', name: 'Mali İşler Sorumlusu' },
    { id: 'institution_manager', name: 'Kurum Sorumlusu' }
  ];

  const countries = ['TR', 'DE', 'FR', 'NL', 'BE'];

  return (
    <div className="space-y-6">
      {/* Başlık ve Ekle Butonu */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Kullanıcı Yönetimi</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Yeni Kullanıcı
        </button>
      </div>

      {/* Kullanıcı Tablosu */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-dark-50 dark:bg-dark-800">
                <th>Kullanıcı</th>
                <th>Rol</th>
                <th>Ülkeler</th>
                <th>Durum</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-dark-500">{user.email}</div>
                    </div>
                  </td>
                  <td>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                      {roles.find(r => r.id === user.role)?.name}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {user.countries.map((country) => (
                        <span 
                          key={country}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-100 dark:bg-dark-700 text-dark-800 dark:text-dark-200"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    {user.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                        <CheckCircleIcon className="h-5 w-5" />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
                        <XCircleIcon className="h-5 w-5" />
                        Pasif
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-dark-500 hover:text-primary-600 dark:text-dark-400 dark:hover:text-primary-400"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-dark-500 hover:text-red-600 dark:text-dark-400 dark:hover:text-red-400">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kullanıcı Ekleme/Düzenleme Modal */}
      {(showAddModal || selectedUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {selectedUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="label">Ad Soyad</label>
                  <input type="text" className="input" />
                </div>

                <div>
                  <label className="label">E-posta</label>
                  <input type="email" className="input" />
                </div>

                <div>
                  <label className="label">Rol</label>
                  <select className="input">
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Ülkeler</label>
                  <select multiple className="input h-32">
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-dark-500">
                    Birden fazla seçim için Ctrl/Cmd tuşunu basılı tutun
                  </p>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedUser(null);
                    }}
                    className="btn btn-secondary"
                  >
                    İptal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {selectedUser ? 'Güncelle' : 'Ekle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
