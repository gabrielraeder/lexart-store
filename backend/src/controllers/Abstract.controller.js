class AbstractController {
  constructor(
    service,
    req, 
    res, 
    next,
  ) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = service;
  }

  async getAll() {
    try {
      const result = await this.service.getAll();
      return this.res.status(200).json(result);
    } catch (error) {
      this.next(error);
    }
  }

  async getById() {
    try {
      const { id } = this.req.params;
      const result = await this.service.getById(id);
      return this.res.status(200).json(result);
    } catch (error) {
      this.next(error);
    }
  }

  async getByUserId() {
    try {
      const { id } = this.req.params;
      const result = await this.service.getByUserId(id);
      return this.res.status(200).json(result);
    } catch (error) {
      this.next(error);
    }
  }

  async create() {
    try {
      const newObj = await this.service.create(this.req.body);
      return this.res.status(201).json(newObj);
    } catch (error) {
      this.next(error);
    }
  }

  async update() {
    const { id } = this.req.params;
    try {
      const updated = await this.service.update(id, this.req.body);
      return this.res.status(200).json(updated);
    } catch (error) {
      this.next(error);
    }
  }

  async remove() {
    const { id } = this.req.params;
    try {
      await this.service.remove(id);
      return this.res.status(204).json();
    } catch (error) {
      this.next(error);
    }
  }
}

module.exports = AbstractController;