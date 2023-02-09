const {db, TABLE} = require('../config');

/**
 * @desc This function retrieves all the elements from the DB.
 * @return {Object} Object with the result of the petition, may have an
 * error or and Array of tasks.
 */
const getAllTodos = async () => {
  const reqBody = {
    TableName: TABLE,
  };
  try {
    const {Items = []} = await db.scan(reqBody).promise();
    return {success: true, data: Items};
  } catch (error) {
    return {success: false, error};
  }
};

/**
 * This function retrieve a task acording to the ID.
 * @param {string} key - The key of the element in the schema.
 * @param {string} id - It represent the value of the key in the schema.
 * @return {Object} Object with the result of the petition, may have an
 * error or and Object with the specific task.
 */
const getToDoByID = async (key, id) => {
  const reqBody = {
    TableName: TABLE,
    Key: {
      [key]: id,
    },
  };
  try {
    const {Item = {}} = await db.get(reqBody).promise();
    if (!Item.id) throw new Error();
    return {success: true, data: {...Item}};
  } catch (error) {
    return {success: false, error: {status: 404}};
  }
};

/**
 * This function create and update the tasks in the DB.
 * @param {string} payload - This object has all the structure the body.
 * @param {string} id - ID of the task.
 * @return {Object} Object with the response of error or success.
 */
const createUpdateToDo = async (payload) => {
  const reqBody = {
    TableName: TABLE,
    Item: payload,
  };
  try {
    await db.put(reqBody).promise();
    return {success: true};
  } catch (error) {
    return {success: false, error};
  }
};

/**
 * This function create and update the tasks in the DB.
 * @param {string} key - The key of the element in the schema.
 * @param {string} id - It represent the value of the key in the schema.
 * @return {Object} Object with the response of error or success.
 */
const deleteToDoBy = async (key, id) => {
  const reqBody = {
    TableName: TABLE,
    Key: {
      [key]: id,
    },
  };
  try {
    await db.delete(reqBody).promise();
    return {success: true};
  } catch (error) {
    return {success: false, error};
  }
};

module.exports = {
  getAllTodos,
  getToDoByID,
  createUpdateToDo,
  deleteToDoBy,
};
