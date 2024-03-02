const jwt = require('jsonwebtoken');

const secret = 'jwt-secret';

const getToken = (payload) => 
  // const secret = readFile.readFileSync('../back-end/jwt.evaluation.key', { encoding: 'utf-8' });
  // const jwtConfig = { algorithm: 'HS256', expiresIn: '7d' };
   jwt.sign({ payload }, secret);

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload;
  } catch (error) {
    throw new Error('ERROR');
  }
};

module.exports = { getToken, verifyToken };