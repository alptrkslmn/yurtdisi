const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.ENUM('income', 'expense', 'donation', 'transfer', 'other'),
      allowNull: false,
      comment: 'İşlem türü'
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      comment: 'İşlem tutarı'
    },
    originalAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      comment: 'Orijinal para birimindeki tutar'
    },
    exchangeRate: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      defaultValue: 1,
      comment: 'İşlem anındaki döviz kuru'
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    description: {
      type: DataTypes.TEXT
    },
    reference: {
      type: DataTypes.STRING,
      comment: 'Referans numarası veya kodu'
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled', 'failed'),
      defaultValue: 'completed'
    },
    attachments: {
      type: DataTypes.JSON,
      defaultValue: [],
      comment: 'Ekli dosyaların listesi'
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {},
      comment: 'Ek bilgiler'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['date']
      },
      {
        fields: ['type']
      },
      {
        fields: ['status']
      },
      {
        fields: ['institutionId']
      },
      {
        fields: ['categoryId']
      }
    ]
  });

  return Transaction;
};
