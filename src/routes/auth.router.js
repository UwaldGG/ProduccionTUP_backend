const express = require('express');
const router = express.Router(); 
const adminLogin = require('../controllers/auth.controller'); // Importación sin desestructuración

router.post('/login/admin', adminLogin);

module.exports = router;

