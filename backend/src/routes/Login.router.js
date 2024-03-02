const express = require('express');
const LoginController = require('../controllers/Login.controller');

const router = express.Router();

router.get('/', (req, res, next) => new LoginController(req, res, next).getAll());
router.get('/:id', (req, res, next) => new LoginController(req, res, next).getById());
router.get('/email/:email', (req, res, next) => new LoginController(req, res, next).getByEmail());
router.get('/role/:role', (req, res, next) => new LoginController(req, res, next).getByRole());
router.post('/', (req, res, next) => new LoginController(req, res, next).login());
// router.put('/:id', (req, res, next) => new LoginController(req, res, next).update());
router.delete('/:id', (req, res, next) => new LoginController(req, res, next).remove());

module.exports = router;