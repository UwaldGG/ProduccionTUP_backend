const EmpleadosTareasService = require('../services/empleados_tareas.services');
//const { getById } = require('./distritos.controller');
const service = new EmpleadosTareasService();

const create = async (req, res) => {
    try {
        const response = await service.create(req.body);
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const get = async (req, res) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id, body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const actualizarTareas = async (req, res) => {
    const tareas = req.body;  // Los datos enviados desde el frontend
    try {
      const result = await service.actualizarTareas(tareas);
      return res.status(200).json(result);  // Enviamos una respuesta exitosa
    } catch (error) {
      return res.status(500).json({ error: error.message });  // En caso de error, enviamos una respuesta de error
    }
  }

  // controller/empleadosTareasController.js

const actualizarDatosTareas = async (req, res) => {
    console.log("datos recibidos en el backend", req.body);
    try {
      const datosTareas = Array.isArray(req.body) ? req.body : [req.body]; // Convertir a arreglo si es un solo objeto
      const resultado = await service.actualizarTareas(datosTareas); // Llamada al servicio
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error al actualizar los datos de tareas:', error);
      res.status(500).json({ error: 'Error al actualizar los datos de tareas' });
    }
  };
  
const getTareasPorEmpleadoYAnio = async (req, res) => {
    const { fk_empleado, anio } = req.params;  // Obtiene los parámetros de la solicitud
    try {
        const tareas = await service.findByEmpleadoYAnio(fk_empleado, anio);
        res.status(200).json(tareas);
    } catch (error) {
        console.error('Error al obtener tareas por empleado y año:', error);
        res.status(500).json({ success: false, message: 'Error al obtener tareas' });
    }
};


const obtenerConsolidadoPorDistrito = async (req, res) => {
    const { ID_Distrito } = req.params;
    const { anio } = req.query;
    try {
      const tareas = await service.obtenerConsolidadoPorDistrito(ID_Distrito, anio);
      res.status(200).json(tareas);
    } catch (error) {
      console.error('Error al obtener consolidado por distrito y año', error);
      res.status(500).json({ success: false, message: 'Error al obtener consolidado' });
    }
  };
  
module.exports = {
    create, 
    get, 
    getById, 
    update,
    _delete, 
    actualizarTareas, 
    actualizarDatosTareas,
    getTareasPorEmpleadoYAnio,
    obtenerConsolidadoPorDistrito
};