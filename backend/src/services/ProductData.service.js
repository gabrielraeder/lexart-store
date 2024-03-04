const AbstractService = require('./Abstract.service');
const { ProductData, Sequelize } = require('../database/models');

class ProductDataService extends AbstractService {
  constructor() {
    super(ProductData);
    this.productData = ProductData;
  }

  async findProductDataDetails(productId, item) {
    return this.productData
      .findOne({
        where: {
          [Sequelize.Op.and]: [
            { color: item.color },
            { productId },
          ],
        },
      });
  }

  async create(id, data) {
    const itemExists = await this.findProductDataDetails(id, data);
    if (itemExists) {
      return this.productData.update(data, { where: { id: itemExists.dataValues.id } });
    }
    return this.productData.create({ ...data, productId: id });
  }
}

module.exports = ProductDataService;
