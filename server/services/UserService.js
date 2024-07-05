const mySQLContext = require('../contexts/MySQLContext');

class UserService {

    constructor() {
        console.log('UserService instance created');
    }

    async getUsers() {
        try {
            const users = await mySQLContext.executeAsync('SELECT * FROM users u', []);

            return users;
        } catch (ex) {
            throw new Error(ex.message);
        }
    }
}

module.exports = new UserService();