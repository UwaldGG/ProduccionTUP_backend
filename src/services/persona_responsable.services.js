const { models } = require('../libs/sequelize');

class PersonaResponsableService {
    constructor() {}

    async find() {
        const res = await models.PersonaResponsable.findAll();
        return res;
    }

    async findOne(id) {
        const res = await models.PersonaResponsable.findByPk(id);
        return res;
    }

    async create(data) {
        const res = await models.PersonaResponsable.create(data);
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
        const total = await models.PersonaResponsable.count();
        return total;
    }
}

module.exports = PersonaResponsableService;