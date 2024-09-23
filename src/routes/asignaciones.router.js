const express = require('express');
const router = express.Router();
const asignacionesController = require('../controllers/asignaciones.controller');

router
    .get('/', asignacionesController.get)
    .get('/:id', asignacionesController.getById)
    .post('/', asignacionesController.create)
    .put('/:id', asignacionesController.update)
    .delete('/:id', asignacionesController._delete);

module.exports = router;