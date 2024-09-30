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



module.exports = {
    create, 
    get, 
    getById, 
    update, 
    _delete, 
    getTotalEmpleados, 
    getEmpleadosWithDistrito
};