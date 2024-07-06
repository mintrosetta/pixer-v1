const express = require('express');
const authRouter = require('../routes/v1/authRoute');
const userRouter = require('../routes/v1/userRoute');

const routers = express.Router();

routers.use('/api/v1/auths', authRouter);
routers.use('/api/v1/users', userRouter);

module.exports = routers;
