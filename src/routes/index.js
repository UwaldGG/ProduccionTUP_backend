// src/routes/index.js
const express = require('express'); 

//const personsRouter = require('./persons.router');
const distritosRouter = require('./distritos.router'); // Importar el router de distritos

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); 
  //router.use('/persons', personsRouter);
  router.use('/distritos', distritosRouter); // Agregar el router de distritos
}

module.exports = routerApi;
