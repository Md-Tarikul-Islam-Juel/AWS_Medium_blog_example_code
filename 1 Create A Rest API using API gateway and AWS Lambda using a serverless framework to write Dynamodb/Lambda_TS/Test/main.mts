import AWS from "aws-sdk";
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event: any) => {
  const tableName = process.env.TABLE_1_NAME;

  if (event.path.endsWith("push")) {
    // Extract email from the body
    const email = JSON.parse(event.body).email;
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Email is required!" }),
      };
    }

    const item = {
      id: Date.now().toString(), // Use timestamp as a unique ID
      email: email,
    };

    const params = {
      TableName: tableName!,
      Item: item,
    };

    try {
      await dynamoDB.put(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Email saved successfully!" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error saving email.", error }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Invalid endpoint" }),
  };
};
