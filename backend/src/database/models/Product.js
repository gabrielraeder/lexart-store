module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'products',
  });

  Product.associate = (models) => {
    Product.hasMany(models.ProductData,
      { foreignKey: 'productId', as: 'product' });
  };

  return Product;
};