// src/routes/distritos.router.js
const express = require('express');
const router = express.Router(); 
const distritosController = require('../controllers/distritos.controller');

router
    .get('/total', distritosController.getTotalDistritos)    
    .get('/', distritosController.get)
    .get('/:id', distritosController.getById)
    .post('/', distritosController.create)
    .put('/:id', distritosController.update)
    .delete('/:id', distritosController._delete);
    


module.exports = router;
