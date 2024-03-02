const express = require('express');
const loginRouter = require('./Login.router');

const router = express.Router();

router.use('/user', loginRouter);

module.exports = router;