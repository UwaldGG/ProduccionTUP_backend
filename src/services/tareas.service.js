const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');

class TareasService {
    constructor() {}

    async find() {
        const res = await models.Tarea.findAll();
        return res;
    }

    async findOne(id) {
        const res = await models.Tarea.findByPk(id);
        return res;
    }

    async create(data) {
        const res = await models.Tarea.create(data);
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
        const total = await models.Tarea.count(); // Método count() de Sequelize
        return total;
    }
}

module.exports = TareasService;