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

    async createUser(email, password) {
        let connection;
        try {
            const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

            connection = await mySQLContext.pool.getConnection();
            await connection.beginTransaction();

            const query = `INSERT INTO users (role_id, email, password, createdAt, updatedAt) VALUES (1, ?, ?, ?, ?);`;
            await connection.execute(query, [email, password, createdAt, createdAt])            
            
            const [user] = await connection.execute('SELECT LAST_INSERT_ID() AS userId;');

            await connection.commit();

            return user[0].userId;
        } catch (ex) {
            await connection.rollback();
            throw new Error(ex.message);
        } finally {
            await connection.release();
        }
    }

    async createProfile(userId, username) {
        try {
            const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

            const query = `INSERT INTO user_profiles (user_id, username, createdAt, updatedAt) VALUES (?,?,?,?)`;
            await  mySQLContext.executeAsync(query, [userId, username, createdAt, createdAt]);
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
            const query = 'SELECT u.username, u.profileImageName FROM user_profiles u WHERE u.username = ?'
            const [profile] = await mySQLContext.executeAsync(query, [username]);

            return profile;
        } catch (ex) {
            throw new Error(ex.message);
        }
    }

    async usernameIsExist(username) {
        try {
            const query = 'SELECT u.username FROM user_profiles u WHERE u.username = ?;'
            const [usernameExist] = await mySQLContext.executeAsync(query, [username]);

            return usernameExist !== undefined;
        } catch (ex) {
            throw new Error(ex.message);
        }
    }
}

module.exports = new UserService();