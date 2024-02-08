const AWS = require("aws-sdk");

module.exports.putPlayer = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  const { name } = JSON.parse(event.body);

  await dynamoDb.put({
        TableName: process.env.USERS_TABLE,
        Key: { id },
        Item: {
          id,
          name
        },
        ConditionExpression: "attribute_exists(id)",

    },
      (err, data) => {
        if (err) {
          console.log(err);
          return { statusCode: 500, body: JSON.stringify(err) };
        }
      }
    ).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
        message: "Player updated successfully"
    }),
  };
};
