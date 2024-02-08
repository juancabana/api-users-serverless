const AWS = require("aws-sdk");

module.exports.deleteUser = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  await dynamoDb.delete(
    { TableName: process.env.USERS_TABLE, Key: { id }},
    (err, data) => {
        if (err) { 
            console.log(err);
             return { statusCode: 500, body: JSON.stringify(err) };
        }
    }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      { message: "User deleted successfully" }
    ),
  };
};
