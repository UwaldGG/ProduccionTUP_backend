const express = require('express');
const router = express.Router();
const PersonaResponsableController = require('../controllers/persona_responsable.controller');

router 
    .get('/', PersonaResponsableController.get)
    .get('/:id', PersonaResponsableController.getById)
    .post('/', PersonaResponsableController.create)
    .put('/:id', PersonaResponsableController.update)
    .delete('/:id', PersonaResponsableController._delete);

module.exports = router;