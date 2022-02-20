const CLIENTS_TABLE = process.env.CLIENTS_TABLE;

const { v4 } = require("uuid");

const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const createClient = async (req, res) => {
  const { name, phone, address } = req.body;
  if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: CLIENTS_TABLE,
    Item: {
      clientId: v4(),
      name: name,
      phone,
      address,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({
      ok: true,
      name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create client" });
  }
};

module.exports = createClient;
