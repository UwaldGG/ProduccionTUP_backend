// src/routes/index.js
const express = require('express'); 

const distritosRouter = require('./distritos.router'); // Importar el router de distritos
const empleadosRouter = require('./empleados.router');
const empleadosTareasRouter = require('./empleados_tareas.router'); 
const tareasRouter = require('./tareas.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); 

  router.use('/distritos', distritosRouter);
  router.use('/empleados', empleadosRouter);
  router.use('/empleados_tareas', empleadosTareasRouter);
  router.use('/tareas', tareasRouter);


}

module.exports = routerApi;
