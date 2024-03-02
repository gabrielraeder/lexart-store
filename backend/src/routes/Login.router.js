const express = require('express');
const LoginController = require('../controllers/Login.controller');

const router = express.Router();

// router.get('/', (req, res, next) => new LoginController(req, res, next).getAll());
router.post('/login', (req, res, next) => new LoginController(req, res, next).login());
router.post('/create', (req, res, next) => new LoginController(req, res, next).create());

module.exports = router;