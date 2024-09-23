// db/models/tareas.model.js
const { Model, DataTypes } = require('sequelize');

const TAREAS_TABLE = 'tareas';

class Tarea extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TAREAS_TABLE,
      modelName: 'Tarea',
      timestamps: false,
    };
  }
}

const TareasSchema = {
  ID_Tareas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = { Tarea, TareasSchema };
