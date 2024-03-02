const AbstractService = require('./Abstract.service');
const { Product, ProductData, sequelize } = require('../database/models');
const HttpException = require('../utils/HttpException');
const productMap = require('../utils/productMap');


class ProductService extends AbstractService {
  constructor() {
    super(Product);
    this.product = Product;
    this.productData = ProductData;
  }
  
  async create(data) {
    const { product, details } = productMap(data);
    
    try {
      const newProductId = await sequelize.transaction(async (t) => {
        const { dataValues: { id } } = await this.product.create(product, { transaction: t });

        const mapped = details
        .map((item) => this.productData.create({ ...item, productId: id }, { transaction: t }));

        await Promise.all(mapped);
        
        return id;
      });
      return this.getById(newProductId);
    } catch (error) {
      throw new HttpException(400, error.message);
    }
  }
}

module.exports = ProductService;

// const { dataValues: { id } } = await this.sale.create({ ...saleData }, { transaction: t });
// const mapped = products
//   .map((p) => this.saleProduct.create({ ...p, saleId: id }, { transaction: t }));
// await Promise.all(mapped);
// const mappedProducts = products
//   .map(({ productId, quantity }) => this.product
//     .decrement('stockQty', { by: quantity, where: { id: productId }, transaction: t }));
//     await Promise.all([...mapped, ...mappedProducts]);