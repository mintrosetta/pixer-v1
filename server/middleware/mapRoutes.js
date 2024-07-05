const express = require('express');
const authRouter = require('../routes/v1/authRoute');

const routers = express.Router();

routers.use('/api/v1/auths', authRouter);

module.exports = routers;
