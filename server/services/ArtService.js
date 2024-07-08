const mySQLContext = require('../contexts/MySQLContext');
const moment = require('moment');

class ArtService {
    constructor() {
        console.log('ArtService instance created');
    }

    async createArt(createBy, fileName, price, description) {
        let connection;
        try {
            const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

            connection = await mySQLContext.pool.getConnection();
            
            await connection.beginTransaction();

            const query = 'INSERT INTO products (user_id, imageName, price, description, createdAt, updatedAt) VALUES (?,?,?,?,?,?)';
            await connection.execute(query, [createBy, fileName, price, description, createdAt, createdAt]);

            const [product] = await connection.execute('SELECT LAST_INSERT_ID() AS productId');

            await connection.commit();

            return product[0].productId;
        } catch (ex) {
            await connection.rollback();
            throw new Error(ex.message);
        } finally {
            await connection.release();
        }
    }

    async appendAgrements(productId, agrements = []) {
        try {
            const query = 'INSERT INTO products_agrements (product_id, agrement_id) VALUES (?,?)';
            for (let i = 0; i < agrements.length; i++) {
                const agrement = agrements[i];

                await mySQLContext.executeAsync(query, [productId, agrement]);
            }
            
        } catch (ex) {
            throw new Error(ex.message);
        }
    }
}

module.exports = new ArtService();