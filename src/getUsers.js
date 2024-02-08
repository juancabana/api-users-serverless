const AWS = require("aws-sdk");

module.exports.getUsers = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamoDb.scan({ TableName: process.env.USERS_TABLE }, (err, data) => {
    if (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    }
    return data;
  }).promise();

  const users = result.Items;

  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};

