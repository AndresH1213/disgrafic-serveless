const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

const AWS = require('aws-sdk');
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const calculate = async (req, res) => {
  let WORKLABOR = process.env.BASEWORK;
  const { form } = req.body;

  const { plates, papper, sizes, machine } = form;

  if (!plates || !papper || !sizes || !machine) {
    return res.status(400).json({
      ok: false,
      msg: 'Falta un objeto en la peticion para realizar el calculo',
    });
  }

  const params = {
    TableName: PRODUCTS_TABLE,
  };

  try {
    const { Items } = await dynamoDbClient.scan(params).promise();

    const plateDb = Items.find((prod) => prod.productId === plates.prodId);
    const papperDb = Items.find((prod) => prod.productId === papper.prodId);
    const machineDb = Items.find((prod) => prod.productId === machine.prodId);

    if (!plateDb || !papperDb || !machineDb) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontró un elemento enviado en la base de datos',
      });
    }

    let result =
      plateDb.price * plates.cant +
      papperDb.price * sizes.cant +
      machineDb.price * machine.cant +
      WORKLABOR;

    let body = {
      plateDb,
      papperDb,
      machineDb,
      precio: plateDb.price + machineDb.price,
    };

    res.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'No se pudo obtener ningun producto de la base de datos',
    });
  }
};

module.exports = calculate;
