const express = require('express');
const router = express.Router();
const DatosMensualesController = require('../controllers/datos_mensuales.controller');

router
    .get('/', DatosMensualesController.get)
    .get('/:id',DatosMensualesController.getById)
    .post('/', DatosMensualesController.create)
    .put('/:id', DatosMensualesController.update)
    .delete('/:id', DatosMensualesController._delete);

module.exports = router;