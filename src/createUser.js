const {v4: uuidv4} = require('uuid');
const AWS = require('aws-sdk');

module.exports.createUser = async (event) => {

    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const { name, idCard } = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = uuidv4();

    const newUser = { id, name, idCard, createdAt }

    await dynamoDb.put({
            TableName: process.env.USERS_TABLE,
            Item: newUser
        },
        (error) => {
            if (error) {
                console.log(error);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Could not create user' })
                };
            }
        }
    ).promise()


    return {
      statusCode: 200,
      body: JSON.stringify(newUser)
    };
  };
  