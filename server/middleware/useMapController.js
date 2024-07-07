const express = require('express');
const authRouter = require('../routes/v1/authRoute');
const userRouter = require('../routes/v1/userRoute');
const artRouter = require('../routes/v1/artRoute');

const routers = express.Router();

routers.use('/api/v1/auths', authRouter);
routers.use('/api/v1/users', userRouter);
routers.use('/api/v1/arts', artRouter);

module.exports = routers;
