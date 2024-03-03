const AbstractService = require('./Abstract.service');
const { Product, ProductData, sequelize, Sequelize } = require('../database/models');
const HttpException = require('../utils/HttpException');
const productMap = require('../utils/productMap');

class ProductService extends AbstractService {
  constructor() {
    super(Product);
    this.product = Product;
    this.productData = ProductData;
  }

  async getAll() {
    const all = await Product.findAll({
      include: [
        { model: ProductData, as: 'data', attributes: { exclude: ['productId', 'id'] } },
      ],
    });
    return all;
  }

  async getById(id) {
    const { dataValues } = await this.product.findOne({
      where: { id },
      include: [
        { model: ProductData, as: 'data', attributes: { exclude: ['productId', 'id'] } },
      ],
    });

    return dataValues;
  }

  async getByName(name) {
    const product = await this.model.findOne({ name });
    return product;
  }
  
  async getByProperty(name, model) {
    const product = await this.model.findOne({
      where: {
        [Sequelize.Op.or]: [
          { name },
          { model }
        ]
      },
    });
    return product;
  }

  async create(data) {    
    try {
      const productExists = await this.getByProperty(data.name, data.model);
      const { product, details } = productMap(data);

      if (productExists) {
        const { dataValues: { id } } = productExists;
  
        await sequelize.transaction(async (t) => {
          const mapped = details
          .map((item) => this.productData.create({ ...item, productId: id }, { transaction: t }));
  
          await Promise.all(mapped);
        });

        return this.getById(id);
      }

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
