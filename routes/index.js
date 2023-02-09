// eslint-disable-next-line new-cap
const router = require('express').Router();
const {
  getAll, createToDo, getToDo, updateToDo, deleteToDo,
} = require('../controller');
const {handleAuthorization} = require('../middelwares/authorization');

router.route('/todos')
    .get(handleAuthorization, getAll)
    .post(handleAuthorization, createToDo);

router.route('/todos/:id')
    .get(handleAuthorization, getToDo)
    .patch(handleAuthorization, updateToDo)
    .delete(handleAuthorization, deleteToDo);

module.exports = {todoRouter: router};
