const ResponseDto = require('../dtos/ResponseDto');
const msgConfig = require('../configs/responseMessageConfig');
const userService = require('../services/UserService');

class UserController {
    
    constructor() {
        console.log('UserController instance created');
    }

    async getProfile(req, res) {
        try {
            const { username } = req.params;

            const isExist = await userService.usernameIsExist(username);
            if (!isExist) return res.status(404).json(new ResponseDto(false, msgConfig.DATA_NOT_FOUND, null));

            const profile = await userService.getProfileByUsername(username);
            console.log(profile);

            return res.status(200).json(new ResponseDto(true, msgConfig.SUCCESS, profile));
        } catch (ex) {
            console.log(ex);
            return res.status(500).json(new ResponseDto(false, msgConfig.FAILED, null));
        }
    }
}

module.exports = new UserController();