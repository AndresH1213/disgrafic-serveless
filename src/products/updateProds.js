const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const updateProduct = async function (req, res) {
  const { price } = req.body;
  const params = {
    TableName: PRODUCTS_TABLE,
    Key: {
      productId: req.params.prodId,
    },
    UpdateExpression: "set price = :price",
    ExpressionAttributeValues: {
      ":price": price,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await dynamoDbClient.update(params).promise();
    res.json({
      ok: true,
      msg: "Product updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurre un problema en el servidor" });
  }
};

module.exports = updateProduct;
