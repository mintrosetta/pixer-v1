const express = require('express');
const multer = require('multer');

const artController = require('../../controllres/ArtController');
const useAuthentication = require('../../middleware/useAuthentication');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const routers = express.Router();

routers.post('', [useAuthentication, upload.single('file')], artController.createArt);

module.exports = routers;