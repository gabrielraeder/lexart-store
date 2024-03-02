const HttpException = require('../utils/HttpException');
const { verifyToken } = require('../utils/Token');

const authMiddleware = (req, res, next) => {
  const token = req.header('authorization');

  if (!token) {
    throw new HttpException(401, 'Token must exist');
  }

  try {
    const decoded = verifyToken(token);
    req.body.decoded = decoded;
    return next();
  } catch (error) {
    throw new HttpException(401, 'Token must be a valid token');
  }
};

module.exports = authMiddleware;