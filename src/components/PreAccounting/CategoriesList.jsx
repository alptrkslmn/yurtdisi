import React, { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const CategoriesList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Eğitim', description: 'Eğitim faaliyetleri' },
    { id: 2, name: 'Yardım', description: 'Sosyal yardım projeleri' },
    { id: 3, name: 'Sağlık', description: 'Sağlık hizmetleri' },
    { id: 4, name: 'Gıda', description: 'Gıda yardımları' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  const handleAddCategory = () => {
    if (newCategory.name.trim() === '') return;

    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...newCategory, id: cat.id }
          : cat
      ));
      setEditingCategory(null);
    } else {
      setCategories([
        ...categories,
        {
          id: Math.max(...categories.map(c => c.id), 0) + 1,
          ...newCategory
        }
      ]);
    }

    setNewCategory({ name: '', description: '' });
    setShowAddModal(false);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({ ...category });
    setShowAddModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Kategoriler
        </h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setNewCategory({ name: '', description: '' });
            setShowAddModal(true);
          }}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 
            text-white rounded-lg hover:from-purple-600 hover:to-purple-800 
            transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Kategori Ekle
        </button>
      </div>

      {/* Kategoriler Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md 
              transition-shadow duration-200 p-6 relative group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <TagIcon className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 
                    dark:hover:text-purple-300 transition-colors duration-200"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 
                    dark:hover:text-red-300 transition-colors duration-200"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
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
                {editingCategory ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}
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
                  Kategori Adı
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 
                    focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Kategori adını girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Açıklama
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 
                    focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Açıklama girin"
                  rows="3"
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
                  onClick={handleAddCategory}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 
                    to-purple-700 hover:from-purple-600 hover:to-purple-800 rounded-md"
                >
                  {editingCategory ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
