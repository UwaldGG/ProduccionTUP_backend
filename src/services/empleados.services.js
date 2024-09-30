const { models } = require('../libs/sequelize');

class EmpleadosService {
    constructor() {}

    async find() {
        const res = await models.Empleado.findAll()
        return res;
    }

    async findOne(id) {
        const res = await models.Empleado.findByPk(id);
        return res;
    }

    async create(data) {
        const res = await models.Empleado.create(data);
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
        const total = await models.Empleado.count();
        return total;
    }

    // Nueva función para ejecutar el query directamente
    async findDistrito() {
        try {
          const res = await models.Empleado.findAll({
            include: [
              {
                model: models.Distrito,
                as: 'Distrito', // Asegúrate de que 'Distrito' es el alias correcto
                attributes: ['NombreDistrito'],
              },
            ],
          });
          return res;
        } catch (error) {
          console.error('Error fetching empleados with distritos:', error); // Esto te dará más detalles del error en la consola del backend
          throw error;
        }
      }

}

module.exports = EmpleadosService;