// db/models/tareas.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');

class Tarea extends Model {}

Tarea.init({
  ID_Tareas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Tarea',
  tableName: 'tareas',
  timestamps: false,
});

module.exports = Tarea;
