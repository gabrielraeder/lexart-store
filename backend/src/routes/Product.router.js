const express = require('express');
const ProductController = require('../controllers/Product.controller');
const authMiddleware = require('../middlewares/auth.middleware');


const router = express.Router();

// router.use(authMiddleware);

router.get('/', (req, res, next) => new ProductController(req, res, next).getAll());
router.post('/create', (req, res, next) => new ProductController(req, res, next).create());

module.exports = router;