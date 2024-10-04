const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');
const { Op } = require('sequelize'); // Importar Op


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
                as: 'distrito', // Asegúrate de que 'Distrito' es el alias correcto
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

      async obtenerTareasPorEmpleadoYDistrito(nombreEmpleado, apellidoEmpleado, nombreDistrito) {
        try {
            const resultado = await models.EmpleadosTareas.findAll({
                include: [
                    {
                        model: models.Empleado,
                        as: 'empleado',
                        where: {
                            Nombre: nombreEmpleado,
                            Apellido: apellidoEmpleado
                        },
                        include: [
                            {
                                model: models.Distrito,
                                as: 'distrito',
                                where: {
                                    NombreDistrito: nombreDistrito.trim() // Usar .trim() aquí
                                }
                            }
                        ]
                    },
                    {
                        model: models.Tarea,
                        as: 'tareas',
                        attributes: ['Descripcion']
                    }
                ],
                attributes: ['Mes', 'Año', 'Valor'] // Campos de 'empleados_tareas'
            });
    
            return resultado;
        } catch (error) {
            console.error("Error al obtener los datos: ", error);
            throw error;
        }
    }


    async obtenerResumenTareasPorDistrito(nombreDistrito, mes, año) {
      try {
          const resultado = await models.EmpleadosTareas.findAll({
              include: [
                  {
                      model: models.Empleado,
                      as: 'empleado',
                      include: [
                          {
                              model: models.Distrito,
                              as: 'distrito',
                              attributes: ['NombreDistrito'],
                              where: {
                                  NombreDistrito: nombreDistrito.trim()
                              }
                          }
                      ]
                  },
                  {
                      model: models.Tarea,
                      as: 'tareas',
                      attributes: ['Descripcion']
                  }
              ],
              where: {
                  Mes: mes,
                  Año: año
              },
              attributes: [
                  [sequelize.col('NombreDistrito'), 'NombreDistrito'],
                  [sequelize.col('tareas.Descripcion'), 'Descripcion'],
                  [sequelize.fn('SUM', sequelize.col('EmpleadosTareas.Valor')), 'TotalTareasRealizadas'],
                  'Mes',
                  'Año'
              ],
              group: ['tareas.Descripcion', 'EmpleadosTareas.Mes', 'EmpleadosTareas.Año', 'NombreDistrito']
          });
  
          return resultado;
      } catch (error) {
          console.error("Error al obtener resumen de tareas:", error);
          throw error;
      }
  }


async obtenerTotalTareasPorDistrito() {
  try {
      const resultado = await models.EmpleadosTareas.findAll({
          include: [
              {
                  model: models.Empleado,
                  as: 'empleado',
                  include: [
                      {
                          model: models.Distrito,
                          as: 'distrito',
                          attributes: ['NombreDistrito'],
                      },
                  ],
              },
              {
                  model: models.Tarea,
                  as: 'tareas',
                  attributes: ['Descripcion'],
              },
          ],
          attributes: [
              [sequelize.fn('SUM', sequelize.col('valor')), 'TotalTareasRealizadas'],
          ],
          group: ['NombreDistrito', 'tareas.Descripcion'],
      });
      
      return resultado;
  } catch (error) {
      console.error("Error al obtener total de tareas por distrito:", error);
      throw error;
  }
}



async obtenerTareasPorEmpleadoYFecha(nombreEmpleado, apellidoEmpleado, año) {
  try {
      const resultado = await models.EmpleadosTareas.findAll({
          include: [
              {
                  model: models.Empleado,
                  as: 'empleado',
                  where: {
                      Nombre: nombreEmpleado,
                      Apellido: apellidoEmpleado,
                  },
                  attributes: ['Nombre', 'Apellido'],
              },
              {
                  model: models.Tarea,
                  as: 'tareas',
                  attributes: ['Descripcion'],
              },
          ],
          where: {
              Año: año,
          },
          attributes: ['Mes', 'Valor'],
          order: [['Mes', 'ASC']], // Ordenar por mes
      });
      
      return resultado;
  } catch (error) {
      console.error("Error al obtener tareas por empleado y fecha:", error);
      throw error;
  }
}



async obtenerPromedioTareasPorDistrito(nombreDistrito) {
  try {
      const resultado = await models.EmpleadosTareas.findAll({
          include: [
              {
                  model: models.Empleado,
                  as: 'empleado',
                  include: [
                      {
                          model: models.Distrito,
                          as: 'distrito',
                          where: { NombreDistrito: nombreDistrito },
                          attributes: ['NombreDistrito'],
                      },
                  ],
                  attributes: ['Nombre', 'Apellido'],
              },
              {
                  model: models.Tarea,
                  as: 'tareas',
                  attributes: ['Descripcion'],
              },
          ],
          attributes: [[sequelize.fn('AVG', sequelize.col('Valor')), 'PromedioTareas']],
          group: ['tareas.Descripcion'],
      });
      
      return resultado;
  } catch (error) {
      console.error("Error al obtener promedio de tareas por distrito:", error);
      throw error;
  }
}


// empleados.services.js
async obtenerDetalleTareasPorMes(mes, año) {
  try {
      const resultado = await models.EmpleadosTareas.findAll({
          include: [
              {
                  model: models.Empleado,
                  as: 'empleado',
                  attributes: ['Nombre', 'Apellido'],
              },
              {
                  model: models.Tarea,
                  as: 'tareas',
                  attributes: ['Descripcion'],
              },
          ],
          where: {
              Mes: mes,
              Año: año,
          },
          attributes: ['Valor', 'Mes'],
      });
      
      return resultado;
  } catch (error) {
      console.error("Error al obtener detalle de tareas:", error);
      throw error;
  }
}


// empleados.services.js
async obtenerEmpleadosSinTareasPorMes(mes) {
  try {
      const resultado = await models.Empleado.findAll({
          include: [
              {
                  model: models.EmpleadosTareas,
                  as: 'empleados_tareas',
                  required: false, // Permitir LEFT JOIN
                  where: {
                      Mes: mes,
                  },
              },
              {
                  model: models.Distrito,
                  as: 'distrito',
                  attributes: ['NombreDistrito'],
              },
          ],
          attributes: ['Nombre', 'Apellido'],
          where: {
              [Op.or]: [
                  { '$empleados_tareas.Mes$': null }, // No tiene tareas
                  { '$empleados_tareas.Mes$': { [Op.ne]: mes } }, // Mes diferente
              ],
          },
      });

      return resultado;
  } catch (error) {
      console.error("Error al obtener empleados sin tareas:", error);
      throw error;
  }
}

async obtenerTotalActividadesPorDistrito() {
  try {
      const resultado = await models.EmpleadosTareas.findAll({
          attributes: [
              [sequelize.fn('SUM', sequelize.col('Valor')), 'TotalTareasRealizadas']
          ],
          include: [
              {
                  model: models.Empleados,
                  as: 'empleado',  // Alias para la relación con empleados
                  attributes: []
              },
              {
                  model: models.Distritos,
                  as: 'distrito',  // Alias para la relación con distritos
                  attributes: ['NombreDistrito']
              },
              {
                  model: models.Tareas,
                  as: 'tareas',  // Alias para la relación con tareas
                  attributes: ['Descripcion']
              }
          ],
          group: ['distritos.NombreDistrito', 'tareas.Descripcion'],
          order: [['distritos.NombreDistrito', 'ASC'], ['tareas.Descripcion', 'ASC']],
      });
      return resultado;
  } catch (error) {
      console.error("Error al obtener el total de actividades por distrito:", error);
      throw error;
  }
}

async obtenerEmpleadosPorDistrito(distritoId) {
    try {
      if (!distritoId) {
        throw new Error('distritoId es undefined o null');
      }
  
      // Consultar los empleados con su distrito asociado, filtrando por distritoId
      const empleadosConDistritos = await models.Empleado.findAll({
        where: { fk_distrito: distritoId },  // Aquí es donde se filtra por distritoId
        include: [
          {
            model: models.Distrito,
            as: 'distrito',
            attributes: ['NombreDistrito'],
          },
        ],
        // Aquí agregamos el ID_Empleado a los atributos
        attributes: ['ID_Empleado', 'Nombre', 'Apellido'],
        order: [[{ model: models.Distrito, as: 'distrito' }, 'NombreDistrito', 'ASC']],
      });
  
      // Reestructurar la respuesta agrupando por distrito
      const empleadosAgrupadosPorDistrito = empleadosConDistritos.reduce((resultado, empleado) => {
        const distrito = empleado.distrito ? empleado.distrito.NombreDistrito : 'Sin distrito';
        if (!resultado[distrito]) {
          resultado[distrito] = [];
        }
        resultado[distrito].push({
          ID_Empleado: empleado.ID_Empleado,  // Asegurarse de incluir ID_Empleado
          Nombre: empleado.Nombre,
          Apellido: empleado.Apellido,
        });
        return resultado;
      }, {});
  
      return empleadosAgrupadosPorDistrito;
    } catch (error) {
      console.error("Error al obtener empleados por distrito:", error);
      throw error;
    }
}
 



}

module.exports = EmpleadosService;