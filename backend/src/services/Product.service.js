const AbstractService = require('./Abstract.service');
const {
  Product, ProductData, sequelize, Sequelize,
} = require('../database/models');
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
    const product = await this.product.findOne({
      where: { id },
      include: [
        { model: ProductData, as: 'data', attributes: { exclude: ['productId', 'id'] } },
      ],
    });
    if (!product) return [];

    return product.dataValues;
  }

  async getByName(name) {
    const product = await this.model.findOne({ name });
    return product;
  }

  async getByProperty(name, model) {
    const product = await this.model.findOne({
      where: {
        [Sequelize.Op.and]: [
          { name },
          { model },
        ],
      },
    });
    return product;
  }

  async findProductDataDetails(productId, details) {
    const mapDetails = details.map((item) => this.productData
      .findOne({
        where: {
          [Sequelize.Op.and]: [
            { color: item.color },
            { productId },
          ],
        },
      }));

    const detailsFound = await Promise.all(mapDetails);
    return detailsFound;
  }

  async updateDataOfExistingProduct(id, details) {
    const detailsFound = await this.findProductDataDetails(id, details);

    await sequelize.transaction(async (t) => {
      const mapped = details
        .map((item) => {
          if (detailsFound) {
            const itemFound = detailsFound.find((data) => data && data.color === item.color);
            if (itemFound) {
              return this.productData.update(item, { where: { id: itemFound.dataValues.id } }, { transaction: t });
            }
          }

          return this.productData.create({ ...item, productId: id }, { transaction: t });
        });

      await Promise.all(mapped);
    });

    return this.getById(id);
  }

  async createNewProduct(product, details) {
    const newProductId = await sequelize.transaction(async (t) => {
      const { dataValues: { id } } = await this.product.create(product, { transaction: t });

      const mapped = details
        .map((item) => this.productData.create({ ...item, productId: id }, { transaction: t }));

      await Promise.all(mapped);

      return id;
    });
    return this.getById(newProductId);
  }

  async create(data) {
    try {
      const productExists = await this.getByProperty(data.name, data.model);
      const { product, details } = productMap(data);

      if (productExists) {
        const { dataValues: { id } } = productExists;
        return this.updateDataOfExistingProduct(id, details);
      }
      return this.createNewProduct(product, details);
    } catch (error) {
      throw new HttpException(400, error.message);
    }
  }
}

module.exports = ProductService;
