const express = require('express');
const authController = require('../../controllres/authController');

const routers = express.Router();

routers.post('/login', authController.login);
routers.post('/register', authController.register);

module.exports = routers;