const {v4: uuid} = require('uuid');
const {createUpdateToDo,
  deleteToDoBy, getToDoByID, getAllTodos} = require('../services');

/**
 * This function get all the elements from the DB
 * @param {Object} req Contains the client's request content.
 * @param {Object} res Used to send response back to the client.
 * @param {Function} next Sends the client to the next Middleware.
*/
const getAll = async (req, res, next) => {
  const result = await getAllTodos();
  if (!result.success) return next(result.error);
  res.send(JSON.stringify(result));
};

/**
 * This function retrieves a task according to the ID sent by the client.
 * @param {Object} req Contains the client's request content.
 * @param {Object} res Used to send response back to the client.
 * @param {Function} next Sends the client to the next Middleware.
*/
const getToDo = async (req, res, next) => {
  const {id} = req.params;
  const result = await getToDoByID('id', id);
  if (!result.success) return next(result.error);
  res.send(JSON.stringify(result));
};

/**
 * This function create a new task into the DB.
 * @param {Object} req Contains the client's request content.
 * @param {Object} res Used to send response back to the client.
 * @param {Function} next Sends the client to the next Middleware.
*/
const createToDo = async (req, res, next) => {
  const {taskName, status, dueDate, notes} = req.body;
  const reqBody = {
    id: `${uuid()}`,
    taskName,
    status,
    dueDate,
    notes,
  };
  const result = await createUpdateToDo(reqBody);
  if (!result.success || Object.values(reqBody).includes(undefined)) {
    return next({status: 400});
  }
  res.send(JSON.stringify(result));
};

/**
 * This function update an existing task acording the ID.
 * @param {Object} req Contains the client's request content.
 * @param {Object} res Used to send response back to the client.
 * @param {Function} next Sends the client to the next Middleware.
*/
const updateToDo = async (req, res, next) => {
  const {id} = req.params;
  const {taskName, status, dueDate, notes} = req.body;
  const reqBody = {
    id,
    taskName,
    status,
    dueDate,
    notes,
  };
  const TodoExist = await getToDoByID('id', id);
  if (!TodoExist.success) return next(TodoExist.error);
  const result = await createUpdateToDo(reqBody);
  if (!result.success) return next(result.error);
  res.send(JSON.stringify(result));
};

/**
 * This function delete an task from the DB acording to the ID.
 * @param {Object} req Contains the client's request content.
 * @param {Object} res Used to send response back to the client.
 * @param {Function} next Sends the client to the next Middleware.
*/
const deleteToDo = async (req, res, next) => {
  const {id} = req.params;
  const TodoExist = await getToDoByID('id', id);
  if (!TodoExist.success) return next(TodoExist.error);
  const result = await deleteToDoBy('id', id);
  if (!result.success) next(result.error);
  res.send(JSON.stringify(result));
};

module.exports = {
  getAll,
  getToDo,
  createToDo,
  updateToDo,
  deleteToDo,
};
