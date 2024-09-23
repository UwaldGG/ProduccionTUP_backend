// src/routes/index.js
const express = require('express'); 

//const personsRouter = require('./persons.router');
const distritosRouter = require('./distritos.router'); // Importar el router de distritos
const persona_responsableRouter = require('./persona_responsable.router');
const datos_mensualesRouter = require('./datos_mensuales.router'); 
const asignacionesRouter = require('./asignaciones.router');
const tareasRouter = require('./tareas.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); 
  //router.use('/persons', personsRouter);
  router.use('/distritos', distritosRouter); // Agregar el router de distritos
  router.use('/PersonaResponsable', persona_responsableRouter);
  router.use('/DatosMensuales', datos_mensualesRouter);
  router.use('/Asignaciones', asignacionesRouter);
  router.use('/Tareas', tareasRouter);


}

module.exports = routerApi;
