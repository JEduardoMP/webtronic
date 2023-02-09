/**
 * Esta función permite configurar la SDK de Amazon Web Services (AWS)
 * para que aplique las credenciales de acceso almacenadas en variables de
 * entorno.
 * Además, se crea un cliente de documentos para la base de datos DynamoDB y se
 * guarda el nombre de la tabla a la que se harán las consultas.
 * Esta información se exporta para poder ser utilizada por otras funciones
 * del programa.
 *
 * @module {Object}
 * @requires aws-sdk
 * @param {String} AWS_REGION - Región donde se encuentra alojada DynamoDB.
 * @param {String} AWS_ACCESS_KEY_ID - Clave de acceso para autenticación.
 * @param {String} AWS_SECRET_ACCESS_KEY - Clave secreta para autenticación.
 * @param {String} TABLE - Nombre de la tabla a la que se harán las consultas.
 * @returns {Object} Objeto con los documentos del cliente para la
 * base de datos DynamoDB y el nombre de la tabla.
 */
const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const db = new AWS.DynamoDB.DocumentClient();

const TABLE = 'todo_app';

module.exports = {
  db,
  TABLE,
};
