const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleados.controller');

router 
    .get('/list', empleadosController.getEmpleadosWithDistrito)
    .get('/total', empleadosController.getTotalEmpleados)    
    .get('/', empleadosController.get)
    .get('/:id', empleadosController.getById)
    .post('/', empleadosController.create)
    .put('/:id', empleadosController.update)
    .delete('/:id', empleadosController._delete);

module.exports = router;