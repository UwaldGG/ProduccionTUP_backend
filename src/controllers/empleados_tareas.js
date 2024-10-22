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
    try {
      const datosTareas = req.body; // Suponemos que se recibe un arreglo de objetos
  
      for (const dato of datosTareas) {
        const { fk_empleado, fk_tarea, fk_distrito, anio, cantidad, mes } = dato;
  
        // Revisa si ya existe un registro para el mes y la tarea de este empleado
        const [registro, created] = await EmpleadosTareas.findOrCreate({
          where: {
            fk_empleado,
            fk_tarea,
            fk_distrito,
            anio,
            mes
          },
          defaults: { cantidad }
        });
  
        if (!created) {
          // Si el registro ya existe, solo se actualiza la cantidad
          await registro.update({ cantidad });
        }
      }
  
      res.status(200).json({ message: 'Datos de tareas actualizados correctamente' });
    } catch (error) {
      console.error('Error al actualizar los datos de tareas:', error);
      res.status(500).json({ error: 'Error al actualizar los datos de tareas' });
    }
  };
  

module.exports = {
    create, get, getById, update, _delete, actualizarTareas, actualizarDatosTareas
};