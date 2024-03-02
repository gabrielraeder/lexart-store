const md5 = require('md5');

const hashMd5Compare = (toCompare, hashedValue) => hashedValue === md5(toCompare);

const hashMd5Encrypt = (toEncrypt) => md5(toEncrypt);

module.exports = { hashMd5Compare, hashMd5Encrypt };