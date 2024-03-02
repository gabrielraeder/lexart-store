const AbstractService = require('./Abstract.service');
const { User } = require('../database/models');
const HttpException = require('../utils/HttpException');
const { hashMd5Compare, hashMd5Encrypt } = require('../utils/Hash');
const { getToken } = require('../utils/Token');

class LoginService extends AbstractService {
  constructor() {
    super(User);
    this.user = User;
  }

  async getByEmail(email) {
    const result = await this.user.findOne({
      where: { email },
    });
    return result;
  }

  async login(user) {
    const { email, password } = user;
    const result = await this.getByEmail(email);
    if (!result) throw new HttpException(404, 'Not Found');
    if (!hashMd5Compare(password, result.password)) {
      throw new HttpException(404, 'email or password incorrect');
    }
    const { password: _, ...userWithoutPassword } = result.dataValues;
    return { ...userWithoutPassword, token: getToken(userWithoutPassword) };
  }

  async create(user) {
    const { email, password } = user;
    const result = await this.getByEmail(email);
    if (result) throw new HttpException(409, 'User already exists');
    const newUser = await super.create({ ...user, password: hashMd5Encrypt(password) });
    const { password: _, ...userWithoutPassword } = newUser.dataValues;
    return { ...userWithoutPassword, token: getToken(userWithoutPassword) };
  }
}

module.exports = LoginService;