const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const getAllProducts = async function (req, res) {
  const params = {
    TableName: PRODUCTS_TABLE,
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
        .json({ error: "No hay ningun producto en la base de datos" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "No se pudo obtener ningun producto de la base de datos",
    });
  }
};

module.exports = getAllProducts;
