const EmpleadosService = require('../services/empleados.services');
const service = new EmpleadosService();

const create = async ( req, res) => {
    try {
        const response = await service.create(req.body);
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error });
    }
}

const get = async (req, res) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message});
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

const getTotalEmpleados = async (req, res) => {
    try {
        const total = await service.count(); // Llamada al método count()
        res.status(200).json(total);
    } catch (error) {
        console.error('Error fetching empleados total:', error);
        res.status(500).json({ message: 'Error fetching empleados total' });
    }
};

const getEmpleadosWithDistrito = async (req, res) => {
    try {
        const empleadosConDistrito = await service.findDistrito();
        res.json(empleadosConDistrito);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const obtenerTareas = async (req, res, next) => {
    const { nombre, apellido, distrito } = req.query; // Suponiendo que recibes estos parámetros en la query
    try {
      const tareas = await service.obtenerTareasPorEmpleadoYDistrito(nombre, apellido, distrito);
      res.json(tareas);
    } catch (error) {
      next(error); // Manejo de errores
    }
  };

  const obtenerResumenTareasPorDistrito = async (req, res) => {
    const { nombreDistrito, mes, año } = req.query; // Asegúrate de pasar estos parámetros en la query
    try {
        const resultado = await service.obtenerResumenTareasPorDistrito(nombreDistrito, mes, año);
        return res.json(resultado);
    } catch (error) {
        console.error("Error al obtener resumen de tareas:", error);
        return res.status(500).json({ message: "Error al obtener resumen de tareas" });
    }
};

const obtenerTotalTareasPorDistrito = async (req, res) => {
    try {
        const resultado = await service.obtenerTotalTareasPorDistrito();
        return res.json(resultado);
    } catch (error) {
        console.error("Error al obtener total de tareas por distrito:", error);
        return res.status(500).json({ message: "Error al obtener total de tareas por distrito" });
    }
};

const obtenerTareasPorEmpleadoYFecha = async (req, res) => {
    const { nombre, apellido, año } = req.query; // Asegúrate de pasar estos parámetros en la query
    try {
        const resultado = await service.obtenerTareasPorEmpleadoYFecha(nombre, apellido, año);
        return res.json(resultado);
    } catch (error) {
        console.error("Error al obtener tareas por empleado y fecha:", error);
        return res.status(500).json({ message: "Error al obtener tareas por empleado y fecha" });
    }
};


const obtenerPromedioTareasPorDistrito = async (req, res) => {
    const { nombreDistrito } = req.query; // Asegúrate de pasar este parámetro en la query
    try {
        const resultado = await service.obtenerPromedioTareasPorDistrito(nombreDistrito);
        return res.json(resultado);
    } catch (error) {
        console.error("Error al obtener promedio de tareas por distrito:", error);
        return res.status(500).json({ message: "Error al obtener promedio de tareas por distrito" });
    }
};


const obtenerDetalleTareasPorMes = async (req, res) => {
    const { mes, año } = req.query; // Asegúrate de pasar estos parámetros en la query
    try {
        const resultado = await service.obtenerDetalleTareasPorMes(mes, año);
        return res.json(resultado);
    } catch (error) {
        console.error("Error al obtener detalle de tareas:", error);
        return res.status(500).json({ message: "Error al obtener detalle de tareas" });
    }
};

const obtenerEmpleadosSinTareasPorMes = async (req, res) => {
    const { mes } = req.query; // Asegúrate de pasar este parámetro en la query
    try {
        const resultado = await service.obtenerEmpleadosSinTareasPorMes(mes);
        return res.json(resultado);
    } catch (error) {
        console.error("Error al obtener empleados sin tareas:", error);
        return res.status(500).json({ message: "Error al obtener empleados sin tareas" });
    }
};


const obtenerTotalActividadesPorDistrito = async (req, res) => {
    try {
        const resultado = await service.obtenerTotalActividadesPorDistrito();
        return res.json(resultado);
    } catch (error) {
        console.error("Error al obtener total de actividades por distrito:", error);
        return res.status(500).json({ message: "Error al obtener total de actividades por distrito" });
    }
};

const obtenerEmpleadosPorDistrito = async (req, res) => {
    try {
      const empleadosPorDistrito = await service.obtenerEmpleadosPorDistrito();
      res.json(empleadosPorDistrito);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const getEmpleadosPorDistrito = async (req, res) => {
    const distritoId = req.params.distritoId;  // Verifica si se está pasando correctamente

    if (!distritoId) {
        return res.status(400).json({ message: 'distritoId no proporcionado' });
    }

    try {
        const empleados = await service.obtenerEmpleadosPorDistrito(distritoId);
        res.json(empleados);
    } catch (error) {
        console.error("Error en getEmpleadosPorDistrito:", error);
        res.status(500).json({ message: 'Error fetching empleados', error });
    }
};



    const empleadosId = async (req, res) => {
    const empleadoId = req.params.id;
    Empleado.findByPk(empleadoId)
      .then(empleado => res.json(empleado))
      .catch(error => res.status(500).json({ error: 'Error al obtener el empleado' }));
  };


  // Ruta para obtener las tareas de un empleado
    const obtenerTareasDeUnEmpleado = async (req, res) => {
    const empleadoId = req.params.empleadoId;
    EmpleadoTarea.findAll({
      where: { empleadoId },
      include: [Tarea] // Incluye el modelo de Tarea
    })
    .then(tareas => res.json(tareas))
    .catch(error => res.status(500).json({ error: 'Error al obtener las tareas del empleado' }));
  };
  


module.exports = {
    create, 
    get, 
    getById, 
    update, 
    _delete, 
    getTotalEmpleados, 
    getEmpleadosWithDistrito,
    obtenerTareas,
    obtenerResumenTareasPorDistrito,
    obtenerTotalTareasPorDistrito,
    obtenerTareasPorEmpleadoYFecha,
    obtenerPromedioTareasPorDistrito,
    obtenerDetalleTareasPorMes,
    obtenerEmpleadosSinTareasPorMes,
    obtenerTotalActividadesPorDistrito,
    obtenerEmpleadosPorDistrito,
    getEmpleadosPorDistrito,
    empleadosId,
    obtenerTareasDeUnEmpleado
};