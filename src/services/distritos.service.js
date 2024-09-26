// src/services/distritos.service.js
const { models } = require('../libs/sequelize');

class DistritosService { 
    constructor() {}

    async find() {
        const res = await models.Distrito.findAll();
        return res;
    }

    async findOne(id) {
        const res = await models.Distrito.findByPk(id);
        return res;
    }

    async create(data) {
        const res = await models.Distrito.create(data);
        return res;
    }

    async update(id, data) {
        const model = await this.findOne(id);
        const res = await model.update(data);
        return res;
    }

    async delete(id) {
        const model = await this.findOne(id);
        await model.destroy();
        return { deleted: true };
    }

    async count() {
        const total = await models.Distrito.count(); // Método count() de Sequelize
        return total;
    }
}

module.exports = DistritosService;
