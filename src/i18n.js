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
        search: 'Ara',
        turkish: 'Türkçe',
        english: 'English',
        profile: 'Profil',
        settings: 'Ayarlar',
        logout: 'Çıkış Yap',
        darkMode: 'Gece Modu',
        lightMode: 'Gündüz Modu',
        title: 'Genel'
      },
      navigation: {
        dashboard: 'Gösterge Paneli',
        countries: 'Ülkeler',
        preAccounting: 'Ön Muhasebe',
        reports: 'Raporlar',
        settings: 'Ayarlar',
        title: 'Navigasyon'
      },
      countries: {
        title: 'Tüm Ülkeler',
        TR: 'Türkiye',
        DE: 'Almanya',
        NL: 'Hollanda',
        branchesDescription: '{{country}} ülkesindeki tüm şube ve temsilcilikler',
        addBranch: 'Yeni Şube Ekle',
        editBranch: 'Şubeyi Düzenle',
        branchName: 'Şube Adı',
        branchNamePlaceholder: 'Şube adını girin',
        country: 'Ülke',
        selectCountry: 'Ülke seçin',
        address: 'Adres',
        addressPlaceholder: 'Adres girin',
        phone: 'Telefon',
        phonePlaceholder: 'Telefon numarası girin',
        email: 'E-posta',
        emailPlaceholder: 'E-posta adresini girin'
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
          description: 'Kullanıcıları buradan yönetebilirsiniz',
          addUser: 'Kullanıcı Ekle',
          editUser: 'Kullanıcı Düzenle',
          name: 'Ad',
          email: 'E-posta',
          role: 'Rol',
          country: 'Ülke',
          password: 'Şifre',
          confirmPassword: 'Şifreyi Onayla',
          namePlaceholder: 'Adı girin',
          emailPlaceholder: 'E-posta adresini girin',
          passwordPlaceholder: 'Şifreyi girin',
          confirmPasswordPlaceholder: 'Şifreyi onaylayın',
          selectRole: 'Rolü seçin',
          selectCountry: 'Ülkeyi seçin',
          add: 'Kullanıcı Ekle'
        },
        language: {
          title: 'Dil Ayarları',
          description: 'Çevirileri düzenlemek için bir dil seçin ve metinleri güncelleyin'
        },
        roles: {
          SUPER_ADMIN: 'Genel Merkez Yöneticisi',
          COUNTRY_COORDINATOR: 'Ülke Koordinatörü',
          FINANCIAL_MANAGER: 'Mali İşler Sorumlusu',
          BRANCH_MANAGER: 'Kurum Yetkilisi',
          VIEWER: 'Görüntüleyici'
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
        english: 'English',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        title: 'General'
      },
      navigation: {
        dashboard: 'Dashboard',
        countries: 'Countries',
        preAccounting: 'Pre-Accounting',
        reports: 'Reports',
        settings: 'Settings',
        title: 'Navigation'
      },
      countries: {
        title: 'All Countries',
        tr: 'Turkey',
        de: 'Germany',
        nl: 'Netherlands',
        branchesDescription: 'All branches and representatives in {{country}}',
        addBranch: 'Add New Branch',
        editBranch: 'Edit Branch',
        branchName: 'Branch Name',
        branchNamePlaceholder: 'Enter branch name',
        country: 'Country',
        selectCountry: 'Select country',
        address: 'Address',
        addressPlaceholder: 'Enter address',
        phone: 'Phone',
        phonePlaceholder: 'Enter phone number',
        email: 'Email',
        emailPlaceholder: 'Enter email address'
      },
      common: {
        cancel: 'Cancel',
        save: 'Save',
        add: 'Add',
        deleteConfirmation: 'Are you sure you want to delete this branch?'
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
          title: 'Users',
          description: 'Manage users here',
          addUser: 'Add User',
          editUser: 'Edit User',
          name: 'Name',
          email: 'Email',
          role: 'Role',
          country: 'Country',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          namePlaceholder: 'Enter name',
          emailPlaceholder: 'Enter email',
          passwordPlaceholder: 'Enter password',
          confirmPasswordPlaceholder: 'Confirm password',
          selectRole: 'Select role',
          selectCountry: 'Select country',
          add: 'Add User'
        },
        language: {
          title: 'Language Settings',
          description: 'Select a language and update translations'
        },
        roles: {
          SUPER_ADMIN: 'General Headquarters Manager',
          COUNTRY_COORDINATOR: 'Country Coordinator',
          FINANCIAL_MANAGER: 'Financial Manager',
          BRANCH_MANAGER: 'Branch Manager',
          VIEWER: 'Viewer'
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
