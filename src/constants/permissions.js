// Permission types
export const PERMISSION_TYPES = {
  VIEW: 'VIEW',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  DELETE: 'DELETE'
};

// User roles
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',           // Genel Merkez Yöneticisi
  COUNTRY_COORDINATOR: 'COUNTRY_COORDINATOR', // Ülke Koordinatörü
  FINANCIAL_MANAGER: 'FINANCIAL_MANAGER',     // Mali İşler Sorumlusu
  BRANCH_MANAGER: 'BRANCH_MANAGER',           // Kurum Yetkilisi
  VIEWER: 'VIEWER'                      // Görüntüleyici
};

// Module permissions
export const PERMISSIONS = {
  DASHBOARD: {
    VIEW: 'dashboard.view'
  },
  COUNTRY: {
    VIEW: 'country.view',
    CREATE: 'country.create',
    EDIT: 'country.edit',
    DELETE: 'country.delete'
  },
  BRANCH: {
    VIEW: 'branch.view',
    CREATE: 'branch.create',
    EDIT: 'branch.edit',
    DELETE: 'branch.delete'
  },
  FINANCIAL: {
    VIEW: 'financial.view',
    CREATE: 'financial.create',
    EDIT: 'financial.edit',
    DELETE: 'financial.delete',
    APPROVE: 'financial.approve'
  },
  USER: {
    VIEW: 'user.view',
    CREATE: 'user.create',
    EDIT: 'user.edit',
    DELETE: 'user.delete'
  },
  REPORT: {
    VIEW: 'report.view',
    CREATE: 'report.create',
    EXPORT: 'report.export'
  }
};

// Role-based permissions
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    // Dashboard
    PERMISSIONS.DASHBOARD.VIEW,
    // Country Management
    PERMISSIONS.COUNTRY.VIEW,
    PERMISSIONS.COUNTRY.CREATE,
    PERMISSIONS.COUNTRY.EDIT,
    PERMISSIONS.COUNTRY.DELETE,
    // Branch Management
    PERMISSIONS.BRANCH.VIEW,
    PERMISSIONS.BRANCH.CREATE,
    PERMISSIONS.BRANCH.EDIT,
    PERMISSIONS.BRANCH.DELETE,
    // Financial Management
    PERMISSIONS.FINANCIAL.VIEW,
    PERMISSIONS.FINANCIAL.CREATE,
    PERMISSIONS.FINANCIAL.EDIT,
    PERMISSIONS.FINANCIAL.DELETE,
    PERMISSIONS.FINANCIAL.APPROVE,
    // User Management
    PERMISSIONS.USER.VIEW,
    PERMISSIONS.USER.CREATE,
    PERMISSIONS.USER.EDIT,
    PERMISSIONS.USER.DELETE,
    // Reports
    PERMISSIONS.REPORT.VIEW,
    PERMISSIONS.REPORT.CREATE,
    PERMISSIONS.REPORT.EXPORT
  ],
  [ROLES.COUNTRY_COORDINATOR]: [
    // Dashboard
    PERMISSIONS.DASHBOARD.VIEW,
    // Country Management (limited to their country)
    PERMISSIONS.COUNTRY.VIEW,
    // Branch Management
    PERMISSIONS.BRANCH.VIEW,
    PERMISSIONS.BRANCH.CREATE,
    PERMISSIONS.BRANCH.EDIT,
    // Financial Management
    PERMISSIONS.FINANCIAL.VIEW,
    PERMISSIONS.FINANCIAL.CREATE,
    PERMISSIONS.FINANCIAL.EDIT,
    PERMISSIONS.FINANCIAL.APPROVE,
    // User Management (limited to their country)
    PERMISSIONS.USER.VIEW,
    PERMISSIONS.USER.CREATE,
    PERMISSIONS.USER.EDIT,
    // Reports
    PERMISSIONS.REPORT.VIEW,
    PERMISSIONS.REPORT.CREATE,
    PERMISSIONS.REPORT.EXPORT
  ],
  [ROLES.FINANCIAL_MANAGER]: [
    // Dashboard
    PERMISSIONS.DASHBOARD.VIEW,
    // Country & Branch View
    PERMISSIONS.COUNTRY.VIEW,
    PERMISSIONS.BRANCH.VIEW,
    // Financial Management
    PERMISSIONS.FINANCIAL.VIEW,
    PERMISSIONS.FINANCIAL.CREATE,
    PERMISSIONS.FINANCIAL.EDIT,
    PERMISSIONS.FINANCIAL.APPROVE,
    // Reports
    PERMISSIONS.REPORT.VIEW,
    PERMISSIONS.REPORT.CREATE,
    PERMISSIONS.REPORT.EXPORT
  ],
  [ROLES.BRANCH_MANAGER]: [
    // Dashboard
    PERMISSIONS.DASHBOARD.VIEW,
    // Branch View (limited to their branch)
    PERMISSIONS.BRANCH.VIEW,
    PERMISSIONS.BRANCH.EDIT,
    // Financial Management (limited to their branch)
    PERMISSIONS.FINANCIAL.VIEW,
    PERMISSIONS.FINANCIAL.CREATE,
    PERMISSIONS.FINANCIAL.EDIT,
    // Reports (limited to their branch)
    PERMISSIONS.REPORT.VIEW,
    PERMISSIONS.REPORT.CREATE
  ],
  [ROLES.VIEWER]: [
    // Dashboard
    PERMISSIONS.DASHBOARD.VIEW,
    // View-only permissions
    PERMISSIONS.COUNTRY.VIEW,
    PERMISSIONS.BRANCH.VIEW,
    PERMISSIONS.FINANCIAL.VIEW,
    PERMISSIONS.REPORT.VIEW
  ]
};
