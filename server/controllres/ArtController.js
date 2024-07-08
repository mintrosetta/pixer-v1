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

            if (!(price && agrements && description && file)) return res.status(400).json(new ResponseDto(false, msgConfig.INCOMPLETE_INFORMATION, null)); 
            
            const fileName = Date.now().toString();
            const fileExt = path.extname(file.originalname);
            await awss3Service.upload(file, fileName, fileExt);

            const productId = await artService.createArt(userId, `${fileName}${fileExt}`, price, description);
            await artService.appendAgrements(productId, agrements);

            return res.status(201).json(new ResponseDto(true, msgConfig.SUCCESS, 0));
        } catch (ex) {
            console.log(ex);
            return res.status(500).json(new ResponseDto(false, msgConfig.FAILED, null)); 
        }
    }
}

module.exports = new ArtController();