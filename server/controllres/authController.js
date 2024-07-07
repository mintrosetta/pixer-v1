const ResponseDto = require("../dtos/ResponseDto");
const userService = require("../services/UserService");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const messageConfigs = require("../configs/responseMessageConfig");

class AuthController {

  constructor() {
    console.log('AuthController instance created')
  }

  async register(req, res) {
    try {
      const { email, username, password } = req.body;

      if (!(email && username && password)) {
        return res.status(400).json(new ResponseDto(false, messageConfigs.INCOMPLETE_INFORMATION, null));
      }

      if (await userService.emailIsExist(email)) return res.status(400).json(new ResponseDto(false, messageConfigs.EMAIL_IS_EXIST, null));

      const passwordHash = (await bcrypt.hash(password, 10)).toString();

      const userId = await userService.createUser(email, passwordHash);
      await userService.createProfile(userId, username);

      return res
        .status(201)
        .json(new ResponseDto(true, messageConfigs.SUCCESS, null));
    } catch (ex) {
      console.log(ex);

      return res
        .status(500)
        .json(new ResponseDto(false, messageConfigs.FAILED, null));
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) return res.status(400).json(new ResponseDto(false, messageConfigs.CREDENTIAL_INVALID, null));

      const user = await userService.getUserByEmail(email);

      if (!user) return res.status(400).json(new ResponseDto(false, messageConfigs.CREDENTIAL_INVALID, null));

      const passwordIsMatch = await bcrypt.compare(password, user.password);
      if (!passwordIsMatch) return res.status(400).json(new ResponseDto(false, messageConfigs.CREDENTIAL_INVALID, null));

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1m' });

      const cookieAge = ((1000 * 60) * 60) * 24;
      res.cookie('token', token, {
        maxAge: cookieAge,
        secure: true,
        httpOnly: true,
        sameSite: 'none'
      });

      return res
        .status(200)
        .json(new ResponseDto(true, messageConfigs.SUCCESS, null));
    } catch (ex) {
      console.log(ex);

      return res
        .status(500)
        .json(new ResponseDto(false, messageConfigs.FAILED, null));
    }
  }
}

module.exports = new AuthController();
