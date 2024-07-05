const mysql = require('mysql2/promise');

class MySQLContext {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.MYSQL_URL,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DATABASE,
            connectionLimit: process.env.MYSQL_POOL
        });
        console.log('MySQLContext instance created');
    }

    async executeAsync(query, value) {
        let connection;

        try {
            let connection = await this.pool.getConnection();

            const [result] = await connection.execute(query, value);
            
            return result;
        } catch (ex) {
            throw new Error(ex.message);
        } finally {
            if (connection) connection.release();
        }
    }
}

module.exports = new MySQLContext();