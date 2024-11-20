const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Country = sequelize.define('Country', {
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
    code: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
      comment: 'ISO 3166-1 alpha-3 ülke kodu'
    },
    flag: {
      type: DataTypes.STRING,
      comment: 'Ülke bayrağı URL'
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      comment: 'Varsayılan para birimi kodu'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {},
      comment: 'Ek bilgiler (zaman dilimi, bölge vb.)'
    }
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['code']
      }
    ]
  });

  return Country;
};
