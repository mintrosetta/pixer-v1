const ResponseDto = require('../dtos/ResponseDto');
const msgConfig = require('../configs/responseMessageConfig');
const jwt = require('jsonwebtoken');

function useAuthentication(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json(new ResponseDto(false, msgConfig.UNAUTHORIZE, null));
        }
    
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        
        next();
    } catch (ex) {
        if (ex instanceof jwt.TokenExpiredError) {
            console.log('Token expire');
            return res.status(401).json(new ResponseDto(false, msgConfig.TOKEN_EXPIRE, null));
        }

        console.log(ex);
        return res.status(500).json(new ResponseDto(false, msgConfig.UNAUTHORIZE, null));
    }
}

module.exports = useAuthentication;