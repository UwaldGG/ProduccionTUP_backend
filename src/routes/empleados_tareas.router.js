const express = require('express');
const router = express.Router();
const EmpleadosTareasController = require('../controllers/empleados_tareas');

router
    .get('/', EmpleadosTareasController.get)
    .get('/:id', EmpleadosTareasController.getById)
    .post('/', EmpleadosTareasController.create)
    .put('/:id', EmpleadosTareasController.update)
    .delete('/:id', EmpleadosTareasController._delete);

module.exports = router;