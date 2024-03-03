const jwt = require('jsonwebtoken');

const secret = 'jwt-secret';

const getToken = (payload) => jwt.sign({ payload }, secret);

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload;
  } catch (error) {
    throw new Error('ERROR');
  }
};

module.exports = { getToken, verifyToken };
