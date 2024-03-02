const express = require('express');
const loginRouter = require('./Login.router');
const ProductRouter = require('./Product.router');

const router = express.Router();

router.use('/user', loginRouter);
router.use('/product', ProductRouter);

module.exports = router;