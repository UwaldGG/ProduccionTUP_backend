// src/controllers/distritos.controller.js
const DistritosService = require('../services/distritos.service');
const service = new DistritosService();
const { Distrito } = require('../db/models/distritos.model');

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

const getTotalDistritos = async (req, res) => {
    try {
        const total = await service.count(); // Llamada al método count()
        res.status(200).json(total);
    } catch (error) {
        console.error('Error fetching distritos total:', error);
        res.status(500).json({ message: 'Error fetching distritos total' });
    }
}


const getDistritos = async (req, res) => {
    try {
        const distritos = await Distrito.findAll();
        res.json(distritos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving distritos', error });
    }
};

const getWithEmployeeCount = async (req, res) => {
    try {
        const response = await service.findWithEmployeeCount();
        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getDistritosWithEmployeeCount = async (req, res) => {
    try {
      const response = await service.findDistritosWithEmployeeCount();
      res.json({ success: true, data: response });
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
    getTotalDistritos, 
    getDistritos, 
    getWithEmployeeCount,
    getDistritosWithEmployeeCount
};
