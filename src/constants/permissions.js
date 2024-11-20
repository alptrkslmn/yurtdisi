// Yetki türleri
export const PERMISSIONS = {
  // Ülke yetkileri
  COUNTRY: {
    VIEW: 'country.view',
    CREATE: 'country.create',
    EDIT: 'country.edit',
    DELETE: 'country.delete',
  },
  // Gelir/Gider yetkileri
  ACCOUNTING: {
    VIEW: 'accounting.view',
    CREATE: 'accounting.create',
    EDIT: 'accounting.edit',
    DELETE: 'accounting.delete',
  },
  // Rapor yetkileri
  REPORT: {
    VIEW: 'report.view',
    CREATE: 'report.create',
    EXPORT: 'report.export',
  },
  // Kullanıcı yetkileri
  USER: {
    VIEW: 'user.view',
    CREATE: 'user.create',
    EDIT: 'user.edit',
    DELETE: 'user.delete',
  },
  // Ayar yetkileri
  SETTINGS: {
    VIEW: 'settings.view',
    EDIT: 'settings.edit',
  }
};

// Kullanıcı rolleri
export const ROLES = {
  SUPER_ADMIN: 'super_admin',     // Tüm yetkilere sahip
  ADMIN: 'admin',                 // Belirli bir ülke/bölge için tam yetkili
  MANAGER: 'manager',             // Belirli bir organizasyon için yetkili
  ACCOUNTANT: 'accountant',       // Sadece muhasebe işlemleri için yetkili
  VIEWER: 'viewer'                // Sadece görüntüleme yetkisi
};

// Her role ait varsayılan yetkiler
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    // Tüm yetkiler
    ...Object.values(PERMISSIONS.COUNTRY),
    ...Object.values(PERMISSIONS.ACCOUNTING),
    ...Object.values(PERMISSIONS.REPORT),
    ...Object.values(PERMISSIONS.USER),
    ...Object.values(PERMISSIONS.SETTINGS),
  ],
  [ROLES.ADMIN]: [
    // Ülke yetkileri
    ...Object.values(PERMISSIONS.COUNTRY),
    // Muhasebe yetkileri
    ...Object.values(PERMISSIONS.ACCOUNTING),
    // Rapor yetkileri
    ...Object.values(PERMISSIONS.REPORT),
    // Sınırlı kullanıcı yetkileri
    PERMISSIONS.USER.VIEW,
    PERMISSIONS.USER.CREATE,
    PERMISSIONS.USER.EDIT,
    // Sınırlı ayar yetkileri
    PERMISSIONS.SETTINGS.VIEW,
  ],
  [ROLES.MANAGER]: [
    // Sınırlı ülke yetkileri
    PERMISSIONS.COUNTRY.VIEW,
    PERMISSIONS.COUNTRY.EDIT,
    // Muhasebe yetkileri
    ...Object.values(PERMISSIONS.ACCOUNTING),
    // Sınırlı rapor yetkileri
    PERMISSIONS.REPORT.VIEW,
    PERMISSIONS.REPORT.EXPORT,
    // Ayarları görüntüleme
    PERMISSIONS.SETTINGS.VIEW,
  ],
  [ROLES.ACCOUNTANT]: [
    // Ülke görüntüleme
    PERMISSIONS.COUNTRY.VIEW,
    // Muhasebe yetkileri
    ...Object.values(PERMISSIONS.ACCOUNTING),
    // Rapor yetkileri
    PERMISSIONS.REPORT.VIEW,
    PERMISSIONS.REPORT.EXPORT,
    // Ayarları görüntüleme
    PERMISSIONS.SETTINGS.VIEW,
  ],
  [ROLES.VIEWER]: [
    // Sadece görüntüleme yetkileri
    PERMISSIONS.COUNTRY.VIEW,
    PERMISSIONS.ACCOUNTING.VIEW,
    PERMISSIONS.REPORT.VIEW,
    PERMISSIONS.SETTINGS.VIEW,
  ],
};
