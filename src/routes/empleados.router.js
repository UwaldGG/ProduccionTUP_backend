const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleados.controller');

router 
    .get('/list', empleadosController.getEmpleadosWithDistrito)
    .get('/total', empleadosController.getTotalEmpleados)
    .get('/empleados-tareas', empleadosController.obtenerTareas)
    .get('/resumen-tareas', empleadosController.obtenerResumenTareasPorDistrito)
    .get('/total-tareas', empleadosController.obtenerTotalTareasPorDistrito)
    .get('/tareas-por-fecha', empleadosController.obtenerTareasPorEmpleadoYFecha)
    .get('/promedio-tareas-distrito', empleadosController.obtenerPromedioTareasPorDistrito)
    .get('/detalle-tareas', empleadosController.obtenerDetalleTareasPorMes)
    .get('/empleados-sin-tareas', empleadosController.obtenerEmpleadosSinTareasPorMes)
    .get('/total-actividades-distrito', empleadosController.obtenerTotalActividadesPorDistrito)
    .get('/empleados-por-distrito', empleadosController.obtenerEmpleadosPorDistrito)
    .get('/por-distrito/:distritoId', empleadosController.getEmpleadosPorDistrito)
    .get('/empleados/:id', empleadosController.empleadosId)
    .get('/empleados/:empleadoId/tareas', empleadosController.obtenerTareasDeUnEmpleado)
    .get('/empleado-con-distrito/:id', empleadosController.getEmpleadosPorDistrito2)



    .get('/', empleadosController.get)
    .get('/:id', empleadosController.getById) 

    .post('/', empleadosController.create)
    .put('/:id', empleadosController.update)
    .delete('/:id', empleadosController._delete);

module.exports = router;