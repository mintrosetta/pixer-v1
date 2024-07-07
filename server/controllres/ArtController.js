const path = require('path');

const ResponseDto = require('../dtos/ResponseDto');
const msgConfig = require('../configs/responseMessageConfig');
const artService = require('../services/ArtService');
const awss3Service = require('../services/AWSS3Service');

class ArtController {
    constructor() {
        console.log('ArtController instance created');
    }

    async createArt(req, res) {
        try {
            const { userId } = req.user;
            const { price, agrements, description } = req.body;
            const file = req.file;
        
            await awss3Service.upload(file, Date.now().toString(), path.extname(file.originalname));

            return res.status(201).json(new ResponseDto(true, msgConfig.SUCCESS, null));
        } catch (ex) {
            console.log(ex);
            return res.status(500).json(new ResponseDto(false, msgConfig.FAILED, null)); 
        }
    }
}

module.exports = new ArtController();