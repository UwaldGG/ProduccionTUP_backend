// db/models/datos_mensuales.model.js
const { Model, DataTypes } = require('sequelize');
//const sequelize = require('../libs/sequelize');

const DATOSMENSUALES_TABLE = 'datos_mensuales';

class DatosMensuales extends Model {
  static config (sequelize) {
    return {
      sequelize,
      tableName: DATOSMENSUALES_TABLE,
      modelName: 'DatosMensuales',
      timestamps: false,
    };
  }
}


const DatosMensualesSchema = {
  ID_DatosMensuales: {
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

module.exports = { DatosMensuales, DatosMensualesSchema };
