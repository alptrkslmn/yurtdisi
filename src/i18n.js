import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      common: {
        appName: 'Hüdayi Yurtdışı',
        save: 'Kaydet',
        cancel: 'İptal',
        delete: 'Sil',
        edit: 'Düzenle',
        add: 'Ekle',
        actions: 'İşlemler',
        income: 'Gelir',
        expense: 'Gider',
        comingSoon: 'Çok Yakında',
        search: 'Çeviri ara...',
        turkish: 'Türkçe',
        title: 'Genel'
      },
      navigation: {
        dashboard: 'Ana Sayfa',
        organizations: 'Organizasyonlar',
        preAccounting: 'Ön Muhasebe',
        reports: 'Raporlar',
        settings: 'Ayarlar',
        title: 'Navigasyon'
      },
      countries: {
        turkey: 'Türkiye',
        germany: 'Almanya',
        netherlands: 'Hollanda'
      },
      organizations: {
        title: 'Organizasyonlar'
      },
      preAccounting: {
        title: 'Ön Muhasebe'
      },
      settings: {
        title: 'Ayarlar',
        description: 'Sistem ayarlarını buradan yönetebilirsiniz',
        general: {
          title: 'Genel Ayarlar',
          description: 'Genel sistem ayarlarını buradan yönetebilirsiniz'
        },
        items: {
          title: 'Gelir/Gider Kalemleri',
          description: 'Gelir ve gider kalemlerini buradan yönetebilirsiniz',
          deleteConfirm: 'Bu kalemi silmek istediğinizden emin misiniz?',
          addNew: 'Yeni Kalem Ekle',
          name: 'Kalem Adı',
          type: 'Tür',
          description: 'Açıklama'
        },
        users: {
          title: 'Kullanıcı Yönetimi',
          description: 'Kullanıcıları buradan yönetebilirsiniz'
        },
        language: {
          title: 'Dil Ayarları',
          description: 'Çevirileri düzenlemek için bir dil seçin ve metinleri güncelleyin'
        }
      }
    }
  },
  en: {
    translation: {
      common: {
        appName: 'Hudayi International',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        actions: 'Actions',
        income: 'Income',
        expense: 'Expense',
        comingSoon: 'Coming Soon',
        search: 'Search translations...',
        turkish: 'Turkish',
        title: 'General'
      },
      navigation: {
        dashboard: 'Dashboard',
        organizations: 'Organizations',
        preAccounting: 'Pre-Accounting',
        reports: 'Reports',
        settings: 'Settings',
        title: 'Navigation'
      },
      countries: {
        turkey: 'Turkey',
        germany: 'Germany',
        netherlands: 'Netherlands'
      },
      organizations: {
        title: 'Organizations'
      },
      preAccounting: {
        title: 'Pre-Accounting'
      },
      settings: {
        title: 'Settings',
        description: 'Manage system settings here',
        general: {
          title: 'General Settings',
          description: 'Manage general system settings here'
        },
        items: {
          title: 'Income/Expense Items',
          description: 'Manage income and expense items here',
          deleteConfirm: 'Are you sure you want to delete this item?',
          addNew: 'Add New Item',
          name: 'Item Name',
          type: 'Type',
          description: 'Description'
        },
        users: {
          title: 'User Management',
          description: 'Manage users here'
        },
        language: {
          title: 'Language Settings',
          description: 'Select a language and update translations'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
