exports.handler = async (event: any) => {
  const currentTime = new Date().toISOString(); // Gets the current time in ISO format

  console.log(`Current Time: ${currentTime}`); // Print the current time to CloudWatch logs

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World!",
      time: currentTime,
    }),
  };
};
