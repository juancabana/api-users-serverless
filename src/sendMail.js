const AWS = require('aws-sdk');

const snsRequest = (Message) => {
    const sns = new AWS.SNS();
    const params = {
        Message,
        Subject: 'Test SNS From Lambda',
        TopicArn: process.env.SNS_TOPIC_ARN
    };
    return sns.publish(params).promise();
    
}
module.exports.sendMail = async (event) => {
    try {
        const data = await snsRequest('Hello world');
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }

}