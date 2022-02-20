const CLIENTS_TABLE = process.env.CLIENTS_TABLE;

const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const getAllClients = async function (req, res) {
  const params = {
    TableName: CLIENTS_TABLE,
  };

  try {
    const results = await dynamoDbClient.scan(params).promise();
    if (results) {
      res.json({
        ok: true,
        results,
      });
    } else {
      res
        .status(404)
        .json({ error: "No hay ningun cliente en la base de datos" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "No se pudo obtener ningun cliente de la base de datos" });
  }
};

module.exports = getAllClients;
