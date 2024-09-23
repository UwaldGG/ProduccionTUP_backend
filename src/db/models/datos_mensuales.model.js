// db/models/datos_mensuales.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');

class DatosMensuales extends Model {}

DatosMensuales.init({
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
}, {
  sequelize,
  modelName: 'DatosMensuales',
  tableName: 'datos_mensuales',
  timestamps: false,
});

module.exports = DatosMensuales;
