const ResponseDto = require('../dtos/ResponseDto');
const msgConfig = require('../configs/responseMessageConfig');
const artService = require('../services/ArtService');

class ArtController {
    constructor() {
        console.log('ArtController instance created');
    }

    async createArt(req, res) {
        try {
            const { userId } = req.user;
            console.log(userId);

            return res.status(201).json(new ResponseDto(true, msgConfig.SUCCESS, null));
        } catch (ex) {
            return res.status(500).json(new ResponseDto(false, msgConfig.FAILED, null)); 
        }
    }
}

module.exports = new ArtController();