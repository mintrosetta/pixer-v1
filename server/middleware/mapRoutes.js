const express = require('express');

const ResponseDto = require('../dtos/ResponseDto');
const messageConfig = require('../configs/responseMessageConfig');
const userService = require('../services/UserService');

const routers = express.Router();

routers.get('', async (req, res) => {
    try {
        const users = await userService.getUsers();

        return res.status(200).json(new ResponseDto(true, messageConfig.SUCCESS, users));
    } catch (ex) {
        console.log(ex);
        return res.status(500).json(new ResponseDto(false, messageConfig.FAILED, null));
    } 
});

module.exports = routers;