const CLIENTS_TABLE = process.env.CLIENTS_TABLE;

const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const getClient = async function (req, res) {
  const params = {
    TableName: CLIENTS_TABLE,
    Key: {
      userId: req.params.clientId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { name } = Item;
      res.json({
        ok: true,
        name,
      });
    } else {
      res
        .status(404)
        .json({ error: 'No se pudo encontrar el cliente por "clientId"' });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "No se pudo recuperar el cliente de la base de datos" });
  }
};

module.exports = getClient;
