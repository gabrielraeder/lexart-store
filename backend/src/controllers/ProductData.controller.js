const AbstractController = require('./Abstract.controller');
const ProductDataService = require('../services/ProductData.service');

class ProductDataController extends AbstractController {
  constructor(req, res, next) {
    const productDataService = new ProductDataService();
    super(
      productDataService,
      req,
      res,
      next,
    );
    this.productService = productDataService;
  }

  async create() {
    const { id } = this.req.params;
    try {
      const updated = await this.service.create(id, this.req.body);
      return this.res.status(200).json(updated);
    } catch (error) {
      this.next(error);
    }
  }
}

module.exports = ProductDataController;
