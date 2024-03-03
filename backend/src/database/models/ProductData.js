module.exports = (sequelize, DataTypes) => {
  const ProductData = sequelize.define(
    'ProductData',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      price: DataTypes.INTEGER,
      color: DataTypes.STRING,
      productId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'productdata',
    },
  );

  ProductData.associate = (models) => {
    ProductData.belongsTo(
      models.Product,
      {
        foreignKey: 'productId', as: 'data', onDelete: 'CASCADE', onUpdate: 'CASCADE',
      },
    );
  };

  return ProductData;
};
