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


    async findRegistros() {
        const query = `
            SELECT 
                e.ID_Empleado AS empleadoId,
                e.Nombre AS empleadoNombre,
                t.ID_Tarea AS tareaId,
                t.Descripcion AS tareaNombre,
                r.Mes,
                r.valor
            FROM empleados_tareas r
            INNER JOIN empleados e ON r.fk_empleado = e.ID_Empleado
            INNER JOIN tareas t ON r.fk_tarea = t.ID_Tarea
        `;

        const [results] = await sequelize.query(query);
        return results;
    }

    
}

module.exports = TareasService;