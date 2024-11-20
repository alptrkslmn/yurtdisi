const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Currency = sequelize.define('Currency', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
      comment: 'ISO 4217 para birimi kodu'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    symbol: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    exchangeRate: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      defaultValue: 1,
      comment: 'TRY karşısındaki güncel kur'
    },
    lastUpdate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Son kur güncelleme tarihi'
    },
    isBaseCurrency: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Temel para birimi mi?'
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
      }
    ]
  });

  // Varsayılan para birimlerini oluştur
  Currency.afterSync(async () => {
    const currencies = [
      { code: 'TRY', name: 'Türk Lirası', symbol: '₺', isBaseCurrency: true },
      { code: 'USD', name: 'Amerikan Doları', symbol: '$' },
      { code: 'EUR', name: 'Euro', symbol: '€' },
      { code: 'GBP', name: 'İngiliz Sterlini', symbol: '£' }
    ];

    for (const currency of currencies) {
      await Currency.findOrCreate({
        where: { code: currency.code },
        defaults: currency
      });
    }
  });

  return Currency;
};
