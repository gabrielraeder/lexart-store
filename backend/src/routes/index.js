const express = require('express');
const loginRouter = require('./Login.router');

const router = express.Router();

router.use('/login', loginRouter);

module.exports = router;