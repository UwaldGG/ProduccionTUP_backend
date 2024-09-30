// db/models/datos_mensuales.model.js
const { Model, DataTypes } = require('sequelize');
//const sequelize = require('../libs/sequelize');

const EMPLEADOSTAREAS_TABLE = 'empleadostareas';

class EmpleadosTareas extends Model {
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
  fk_tareas: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
};

module.exports = { EmpleadosTareas, EmpleadosTareasSchema };
