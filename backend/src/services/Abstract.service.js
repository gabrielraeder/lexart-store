const HttpException = require('../utils/HttpException');

class AbstractService {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    const all = await this.model.findAll();
    return all;
  }

  async create(obj) {
    const created = await this.model.create(obj);
    return created;
  }

  async getById(id) {
    const item = await this.model.findByPk(id);
    if (!item) throw new HttpException(404, 'Not Found');
    return item;
  }

  async update(id, obj) {
    const [qtdUpdated] = await this.model.update(obj, { where: { id } });
    if (!qtdUpdated) throw new HttpException(404, 'Not Found');
    const updated = await this.getById(+id);
    return updated;
  }

  async remove(id) {
    const removed = await this.model.destroy({ where: { id } });
    if (!removed) throw new HttpException(404, 'Not Found');
    return removed;
  }
}

module.exports = AbstractService;