module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "HelloWorld!",
        input: event,
      },
      null,
      2
    ),
  };
};

// sls remove --stage dev -r us-east-1 --verbose