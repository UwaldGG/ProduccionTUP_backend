const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');
//const EmpleadosService = require('./empleados.services');

class EmpleadosTareasService {
    constructor() {}

    async find() {
        const res = await models.EmpleadosTareas.findAll();
        return res;
    }

    async findOne(id) {
        const res = await models.EmpleadosTareas.findByPk(id);
        return res;
    }

    async create(data) {
        const res = await models.EmpleadosTareas.create(data);
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

            // Método para actualizar las tareas
  async actualizarTareas(tareas) {
    try {
      
      for (const tarea of tareas) {
        await models.EmpleadosTareas.update(
          { valoresMeses: tarea.valoresMeses }, // Actualizamos los valores de los meses
          { where: { fk_tarea: tarea.ID_Tarea } }  // Identificamos la tarea por su ID
        );
      }
      return { message: 'Datos actualizados correctamente' };
    } catch (error) {
      throw new Error('Error al actualizar las tareas');
    }
  }
}

module.exports = EmpleadosTareasService;