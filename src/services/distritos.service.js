// src/services/distritos.service.js
const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');

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

    async findWithEmployeeCount() {
        const res = await models.Distrito.findAll({
            include: [
                {
                    model: models.Empleado,
                    as: 'empleados',
                    attributes: []  // Para evitar seleccionar todos los campos de empleado
                }
            ],
            attributes: [
                'ID_Distrito',
                'NombreDistrito',
                [sequelize.fn('COUNT', sequelize.col('empleados.ID_Empleado')), 'Empleados en el distrito']
            ],
            group: ['Distrito.ID_Distrito']
        });
        return res;
    }

    async findDistritosWithEmployeeCount() {
        const distritos = await models.Distrito.findAll({
          include: [
            {
              model: models.Empleado,
              as: 'empleados',
              attributes: ['Nombre', 'Apellido'], // Seleccionamos solo los campos necesarios
            },
          ],
          attributes: ['NombreDistrito'], // Seleccionamos solo el nombre del distrito
        });

    // Mapeamos los datos para incluir el número de empleados por distrito y sus detalles
    const result = distritos.map(distrito => ({
        NombreDistrito: distrito.NombreDistrito,
        empleados: distrito.empleados.map(empleado => ({
          Nombre: empleado.Nombre,
          Apellido: empleado.Apellido,
        })),
        totalEmpleados: distrito.empleados.length, // Contamos el total de empleados por distrito
      }));
  
      return result;
    }
}

module.exports = DistritosService;
