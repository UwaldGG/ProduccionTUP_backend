// db/models/asignaciones.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');

class Asignacion extends Model {}

Asignacion.init({
  ID_Asignacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fk_persona_responsable: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fk_tareas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fk_distrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Asignacion',
  tableName: 'asignaciones',
  timestamps: false,
});

module.exports = Asignacion;
