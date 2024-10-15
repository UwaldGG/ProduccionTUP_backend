const TareasService = require('../services/tareas.service');
const service = new TareasService();

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

const getTotalTareas = async (req, res) => {
    try {
        const total = await service.count(); // Llamada al método count()
        res.status(200).json(total);
    } catch (error) {
        console.error('Error fetching tareas total:', error);
        res.status(500).json({ message: 'Error fetching tareas total' });
    }
};

const getRegistros = async (req, res) => {
    try {
        const response = await service.findRegistros();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const getTareasPorEmpleado = async (req, res) => {
    const { idEmpleado } = req.params;

    try {
      const tareas = await service.getTareasPorEmpleado(idEmpleado);
      res.status(200).json(tareas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

module.exports = {
    create, get, getById, update, _delete, getTotalTareas, getRegistros, getTareasPorEmpleado
};
