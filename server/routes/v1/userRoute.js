const express = require('express');
const userController = require('../../controllres/UserController');

const routers = express.Router();

routers.get('/:username/profile', userController.getProfile);

module.exports = routers;