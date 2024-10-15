// db/models/datos_mensuales.model.js
const { Model, DataTypes } = require('sequelize');
//const sequelize = require('../libs/sequelize');

const EMPLEADOSTAREAS_TABLE = 'empleados_tareas';

class EmpleadosTareas extends Model {

  static associate(models) {
    this.belongsTo(models.Tarea, { as: 'tareas', foreignKey: 'fk_tarea' });  // Asegúrate de que el alias sea 'Distrito'
    this.belongsTo(models.Empleado, { as: 'empleado', foreignKey: 'fk_empleado' });  // Asegúrate de que el alias sea 'Distrito'
    this.belongsTo(models.Distrito, { as: 'distritos', foreignKey: 'fk_distrito'});
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: EMPLEADOSTAREAS_TABLE,
      modelName: 'EmpleadosTareas',
      timestamps: false,
    };
  }
}


const EmpleadosTareasSchema = {
  ID_Dato: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fk_tarea: {
    field: 'fk_tarea',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tareas',
      key: 'ID_Tarea'
    }
  },
  fk_empleado: {
    field: 'fk_empleado',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empleados',
      key: 'ID_Empleado'
    }
  },
  fk_distrito: {
    field: 'fk_distrito',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'distritos',
      key: 'ID_Distrito'
    }
  },
};

module.exports = { EmpleadosTareas, EmpleadosTareasSchema };
