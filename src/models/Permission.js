const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Permission = sequelize.define('Permission', {
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
    module: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'İzinin ait olduğu modül (countries, institutions, transactions, etc.)'
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'İzin türü (view, create, edit, delete)'
    }
  }, {
    timestamps: true
  });

  // Varsayılan izinleri oluştur
  Permission.afterSync(async () => {
    const modules = ['countries', 'institutions', 'transactions', 'users', 'reports'];
    const actions = ['view', 'create', 'edit', 'delete'];
    
    const permissions = [];
    modules.forEach(module => {
      actions.forEach(action => {
        permissions.push({
          name: `${module}_${action}`,
          displayName: `${module.charAt(0).toUpperCase() + module.slice(1)} ${action}`,
          module: module,
          action: action
        });
      });
    });

    for (const permission of permissions) {
      await Permission.findOrCreate({
        where: { name: permission.name },
        defaults: permission
      });
    }
  });

  return Permission;
};
