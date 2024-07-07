const express = require('express');

const artController = require('../../controllres/ArtController');
const useAuthentication = require('../../middleware/useAuthentication');

const routers = express.Router();

routers.post('', [useAuthentication], artController.createArt);

module.exports = routers;