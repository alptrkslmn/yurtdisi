import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const COUNTRY_MAP = {
  tr: 'Türkiye',
  de: 'Almanya',
  nl: 'Hollanda'
};

const Organizations = () => {
  const { countryId } = useParams();
  console.log('Organizations component rendering for country:', countryId);

  useEffect(() => {
    console.log('Organizations component mounted');
    return () => console.log('Organizations component unmounted');
  }, []);

  const [organizations, setOrganizations] = useState([
    { 
      id: 1, 
      name: 'Üsküdar Şubesi', 
      country: 'tr',
      address: 'Aziz Mahmut Hüdayi Mah. Aziz Mahmut Efendi Sok. No:2 Üsküdar/İstanbul',
      phone: '+90 216 553 33 33',
      email: 'uskudar@hudayi.org',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Berlin Şubesi', 
      country: 'de',
      address: 'Kolonnenstraße 30, 10829 Berlin, Germany',
      phone: '+49 30 12345678',
      email: 'berlin@hudayi.org',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Amsterdam Şubesi', 
      country: 'nl',
      address: 'Bijlmerdreef 1289, 1103 TV Amsterdam, Netherlands',
      phone: '+31 20 123 4567',
      email: 'amsterdam@hudayi.org',
      status: 'active'
    },
  ]);

  const filteredOrganizations = countryId 
    ? organizations.filter(org => org.country === countryId)
    : organizations;

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState(null);
  const [newOrganization, setNewOrganization] = useState({
    name: '',
    country: countryId || '',
    address: '',
    phone: '',
    email: '',
    status: 'active'
  });

  const handleAddOrganization = () => {
    if (newOrganization.name.trim() === '') return;

    if (editingOrganization) {
      setOrganizations(organizations.map(org => 
        org.id === editingOrganization.id 
          ? { ...newOrganization, id: org.id }
          : org
      ));
      setEditingOrganization(null);
    } else {
      setOrganizations([
        ...organizations,
        {
          id: Math.max(...organizations.map(o => o.id), 0) + 1,
          ...newOrganization,
          country: countryId || newOrganization.country
        }
      ]);
    }

    setNewOrganization({
      name: '',
      country: countryId || '',
      address: '',
      phone: '',
      email: '',
      status: 'active'
    });
    setShowAddModal(false);
  };

  const handleEditOrganization = (organization) => {
    setEditingOrganization(organization);
    setNewOrganization({ ...organization });
    setShowAddModal(true);
  };

  const handleDeleteOrganization = (organizationId) => {
    if (window.confirm('Bu kurumu silmek istediğinizden emin misiniz?')) {
      setOrganizations(organizations.filter(org => org.id !== organizationId));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {countryId ? `${COUNTRY_MAP[countryId]} Kurumları` : 'Tüm Kurumlar'}
          </h1>
          {countryId && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {COUNTRY_MAP[countryId]}'deki tüm şube ve temsilcilikler
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setEditingOrganization(null);
            setNewOrganization({
              name: '',
              country: countryId || '',
              address: '',
              phone: '',
              email: '',
              status: 'active'
            });
            setShowAddModal(true);
          }}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 
            text-white rounded-lg hover:from-blue-600 hover:to-blue-800 
            transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Kurum Ekle
        </button>
      </div>

      {/* Kurumlar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrganizations.map((organization) => (
          <div
            key={organization.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md 
              transition-shadow duration-200 p-6 relative group"
          >
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => handleEditOrganization(organization)}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 
                  dark:hover:text-blue-300 transition-colors duration-200"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteOrganization(organization.id)}
                className="text-red-600 hover:text-red-700 dark:text-red-400 
                  dark:hover:text-red-300 transition-colors duration-200"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <BuildingOfficeIcon className="h-12 w-12 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                  {organization.name}
                </h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <GlobeAltIcon className="h-5 w-5 mr-2" />
                    {COUNTRY_MAP[organization.country]}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    {organization.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <EnvelopeIcon className="h-5 w-5 mr-2" />
                    {organization.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ekleme/Düzenleme Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {editingOrganization ? 'Kurumu Düzenle' : 'Yeni Kurum Ekle'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Kurum Adı
                </label>
                <input
                  type="text"
                  value={newOrganization.name}
                  onChange={(e) => setNewOrganization({ ...newOrganization, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Kurum adını girin"
                />
              </div>

              {!countryId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ülke
                  </label>
                  <select
                    value={newOrganization.country}
                    onChange={(e) => setNewOrganization({ ...newOrganization, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
                      focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Ülke seçin</option>
                    {Object.entries(COUNTRY_MAP).map(([id, name]) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Adres
                </label>
                <textarea
                  value={newOrganization.address}
                  onChange={(e) => setNewOrganization({ ...newOrganization, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Adres girin"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={newOrganization.phone}
                  onChange={(e) => setNewOrganization({ ...newOrganization, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Telefon numarası girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  E-posta
                </label>
                <input
                  type="email"
                  value={newOrganization.email}
                  onChange={(e) => setNewOrganization({ ...newOrganization, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="E-posta adresini girin"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 
                    rounded-md dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  İptal
                </button>
                <button
                  onClick={handleAddOrganization}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 
                    to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-md"
                >
                  {editingOrganization ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Organizations;
