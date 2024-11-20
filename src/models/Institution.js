const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Institution = sequelize.define('Institution', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Kurum benzersiz kodu'
    },
    type: {
      type: DataTypes.ENUM('education', 'health', 'social', 'religious', 'other'),
      allowNull: false,
      defaultValue: 'other',
      comment: 'Kurum türü'
    },
    address: {
      type: DataTypes.TEXT
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    contactPerson: {
      type: DataTypes.STRING,
      comment: 'İletişim kurulacak kişi'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {},
      comment: 'Ek bilgiler'
    }
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['code']
      },
      {
        fields: ['countryId', 'name']
      }
    ]
  });

  return Institution;
};
