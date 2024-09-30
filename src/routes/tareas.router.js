const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareas.controller');

router 
    .get('/total', tareasController.getTotalTareas)
    .get('/', tareasController.get)
    .get('/:id', tareasController.getById)
    .post('/', tareasController.create)
    .put('/:id', tareasController.update)
    .delete('/:id', tareasController._delete);

module.exports = router; 