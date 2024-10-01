// db/models/datos_mensuales.model.js
const { Model, DataTypes } = require('sequelize');
//const sequelize = require('../libs/sequelize');

const EMPLEADOSTAREAS_TABLE = 'empleados_tareas';

class EmpleadosTareas extends Model {

  static associate(models) {
    this.belongsTo(models.Tarea, { as: 'tareas', foreignKey: 'fk_tarea' });  // Asegúrate de que el alias sea 'Distrito'
    this.belongsTo(models.Empleado, { as: 'empleado', foreignKey: 'fk_empleado' });  // Asegúrate de que el alias sea 'Distrito'

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
  Mes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Valor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Año: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fk_tarea: {
    field: 'fk_tarea',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tareas',
      key: 'ID_Tareas'
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
};

module.exports = { EmpleadosTareas, EmpleadosTareasSchema };
