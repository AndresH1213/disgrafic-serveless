const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

const { v4 } = require("uuid");

const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const createProduct = async (req, res) => {
  const { type, subtype, name, label, price } = req.body;
  if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: PRODUCTS_TABLE,
    Item: {
      productId: v4(),
      type,
      subtype,
      name,
      label,
      price,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({
      ok: true,
      msg: "Producto creado",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error al crear el producto en el servidor" });
  }
};

module.exports = createProduct;
