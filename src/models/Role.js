const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Yetki seviyesi (0: En düşük, 100: Admin)'
    }
  }, {
    timestamps: true
  });

  // Varsayılan rolleri oluştur
  Role.afterSync(async () => {
    const roles = [
      { name: 'admin', displayName: 'Admin', level: 100 },
      { name: 'country_coordinator', displayName: 'Ülke Koordinatörü', level: 80 },
      { name: 'financial_manager', displayName: 'Mali İşler Sorumlusu', level: 60 },
      { name: 'institution_manager', displayName: 'Kurum Sorumlusu', level: 40 }
    ];

    for (const role of roles) {
      await Role.findOrCreate({
        where: { name: role.name },
        defaults: role
      });
    }
  });

  return Role;
};
