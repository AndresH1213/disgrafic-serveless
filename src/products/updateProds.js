const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const updateProduct = async function (req, res) {
  const { price } = req.body;
  const params = {
    TableName: PRODUCTS_TABLE,
    Key: {
      productId: req.params.productId,
    },
    UpdateExpression: "set price = :price",
    ExpressionAttributeValues: {
      ":price": price,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const { Item } = await dynamoDbClient.update(params).promise();
    if (Item) {
      res.json({
        ok: true,
        msg: "Product updated",
      });
    } else {
      res.status(404).json({ error: "No se pudo actualizar el producto" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurre un problema en el servidor" });
  }
};

module.exports = updateProduct;
