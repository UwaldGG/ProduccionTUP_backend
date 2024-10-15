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

    async getTareasPorEmpleado(idEmpleado) {
        try {
          // Consulta para obtener las tareas y valores mensuales del empleado desde la tabla empleados_tareas
          const tareas = await models.EmpleadosTareas.findAll({
            where: { fk_empleado: idEmpleado },
            include: [
              {
                model: models.Tarea,
                as: 'tareas', // Alias usado en la asociación
                attributes: ['ID_Tarea', 'Descripcion'], // Obtener la descripción de la tarea desde la tabla tareas
              },
            ],
          });
      
          // Transformar los resultados en un formato adecuado
          const tareasPorMes = tareas.reduce((acc, tarea) => {
            const mes = tarea.mes; // Usar el campo 'mes' como está definido
            const tareaId = tarea.tareas.ID_Tarea; // Usar el alias 'tareas' para acceder a los datos relacionados
            const descripcion = tarea.tareas.Descripcion; // Usar el alias 'tareas' para acceder a la descripción
      
            if (!acc[tareaId]) {
              acc[tareaId] = {
                tareaId,
                descripcion,
                valoresMeses: {},
              };
            }
      
            acc[tareaId].valoresMeses[mes] = tarea.cantidad; // Usar 'cantidad' en lugar de 'Valor'
            return acc;
          }, {});
      
          // Convertir el objeto en un arreglo para enviarlo al frontend
          return Object.values(tareasPorMes);
        } catch (error) {
          throw new Error(`Error obteniendo tareas para el empleado ${idEmpleado}: ${error.message}`);
        }
      }      
      
}

module.exports = TareasService;