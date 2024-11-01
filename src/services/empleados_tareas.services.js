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

    async actualizarTareas(tareas) {
      try {
        for (const tarea of tareas) {
          const { fk_empleado, fk_tarea, fk_distrito, anio, cantidad, mes } = tarea;
    
          if (!fk_empleado || !fk_tarea || !fk_distrito || !anio || !mes) {
            console.error("Datos incompletos:", tarea);
            throw new Error("Datos incompletos para actualizar tareas");
          }
          // Intentar encontrar el registro existente
          let registro = await models.EmpleadosTareas.findOne({
            where: {
              fk_empleado,
              fk_tarea,
              fk_distrito,
              anio,
              mes
            }
          });
    
          if (registro) {
            // Si el registro ya existe, actualizar solo la cantidad
            await registro.update({ cantidad });
          } else {
            // Si el registro no existe, crear uno nuevo
            await models.EmpleadosTareas.create({
              fk_empleado,
              fk_tarea,
              fk_distrito,
              anio,
              cantidad,
              mes
            });
          }
        }
        return { message: 'Datos de tareas actualizados correctamente' };
      } catch (error) {
        console.error('Error al actualizar las tareas:', error);
        throw new Error('Error al actualizar las tareas');
      }
    }
    
    async findByEmpleadoYAnio(fk_empleado, anio) {
      try {
          const res = await models.EmpleadosTareas.findAll({
              where: {
                  fk_empleado,
                  anio
              },
          });
          return res;
      } catch (error) {
          console.error('Error al obtener tareas por empleado y año:', error);
          throw new Error('Error al obtener tareas por empleado y año');
      }
    }

    
    // empleados_services.js
    async obtenerConsolidadoPorDistrito(fk_distrito, anio) {
      try {
        const resultado = await models.EmpleadosTareas.findAll({
          attributes: [
            'fk_tarea',
            'mes',
            [sequelize.fn('SUM', sequelize.col('cantidad')), 'total']
          ],
          where: {
            fk_distrito,
            anio
          },
          group: ['fk_tarea', 'mes'],
          order: [['fk_tarea', 'ASC'], ['mes', 'ASC']]
        });
        return resultado;
      } catch (error) {
        console.error('Error al obtener el consolidado por distrito:', error);
        throw new Error('Error al obtener el consolidado por distrito');
      }
    }
   
}
    


module.exports = EmpleadosTareasService;