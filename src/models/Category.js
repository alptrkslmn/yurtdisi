const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
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
      unique: true
    },
    type: {
      type: DataTypes.ENUM('income', 'expense', 'donation', 'other'),
      allowNull: false,
      defaultValue: 'other',
      comment: 'Kategori türü'
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id'
      },
      comment: 'Üst kategori ID (alt kategoriler için)'
    },
    description: {
      type: DataTypes.TEXT
    },
    color: {
      type: DataTypes.STRING(7),
      defaultValue: '#000000',
      comment: 'Kategori renk kodu (hex)'
    },
    icon: {
      type: DataTypes.STRING,
      comment: 'Kategori ikonu'
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
        fields: ['parentId']
      }
    ]
  });

  // Self-referential association for hierarchical categories
  Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });
  Category.hasMany(Category, { as: 'children', foreignKey: 'parentId' });

  return Category;
};
