const AWS = require('aws-sdk');

class AWSS3Service {
    constructor() {
        console.log('AWSS3Service instance created');

        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECERT_KEY,
            region: process.env.AWS_REGION
        });
    }

    async upload(file, fileName, fileExt) {
        try {
            const params = {
                Bucket: process.env.AWS_S3_BUKETNAME,
                Key: `public/${fileName}${fileExt}`,
                Body: file.buffer,
                ContentType: file.mimeType
            };
    
            await this.s3.upload(params).promise();
        } catch (ex) {
            throw new Error(ex);
        }
    }
}

module.exports = new AWSS3Service();