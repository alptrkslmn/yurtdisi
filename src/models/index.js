const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

// Model tanımlamaları
const User = require('./User')(sequelize);
const Role = require('./Role')(sequelize);
const Permission = require('./Permission')(sequelize);
const Country = require('./Country')(sequelize);
const Institution = require('./Institution')(sequelize);
const Category = require('./Category')(sequelize);
const Transaction = require('./Transaction')(sequelize);
const Currency = require('./Currency')(sequelize);

// İlişki tanımlamaları
User.belongsTo(Role);
Role.hasMany(User);

Role.belongsToMany(Permission, { through: 'RolePermissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions' });

User.belongsToMany(Country, { through: 'UserCountries' });
Country.belongsToMany(User, { through: 'UserCountries' });

Institution.belongsTo(Country);
Country.hasMany(Institution);

Transaction.belongsTo(Institution);
Transaction.belongsTo(Category);
Transaction.belongsTo(Currency);

module.exports = {
  sequelize,
  User,
  Role,
  Permission,
  Country,
  Institution,
  Category,
  Transaction,
  Currency
};
