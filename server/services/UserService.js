const mySQLContext = require('../contexts/MySQLContext');
const moment = require('moment');

class UserService {

    constructor() {
        console.log('UserService instance created');
    }

    async emailIsExist(email) {
        try {
            const [currentEmail] = await mySQLContext.executeAsync('SELECT u.email FROM users u WHERE u.email = ?', [email]);

            return currentEmail !== undefined;
        } catch (ex) {
            throw new Error(ex.message);
        }
    }

    async createUser(email, username, password) {
        try {
            const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')

            const query = `INSERT INTO users (email, username, password, createdAt, updatedAt) VALUES (?,?,?,?,?)`;
            await mySQLContext.executeAsync(query, [email, username, password, createdAt, createdAt]);
        } catch (ex) {
            throw new Error(ex.message);
        }
    }

    async getUserByEmail(email) {
        try {
            const query = 'SELECT u.id, u.email, u.password FROM users u WHERE u.email = ?'
            const [user] = await mySQLContext.executeAsync(query, [email]);

            return user;
        } catch (ex) {
            throw new Error(ex.message);
        }
    }

    async getProfileByUsername(username) {
        try {
            const query = 'SELECT u.username, u.profileImageName, u.description FROM users u WHERE u.username = ?'
            const [profile] = await mySQLContext.executeAsync(query, [username]);

            return profile;
        } catch (ex) {
            throw new Error(ex.message);
        }
    }

    async usernameIsExist(username) {
        try {
            const query = 'SELECT u.username FROM users u WHERE u.username = ?'
            const [usernameExist] = await mySQLContext.executeAsync(query, [username]);

            return usernameExist !== undefined;
        } catch (ex) {
            throw new Error(ex.message);
        }
    }
}

module.exports = new UserService();