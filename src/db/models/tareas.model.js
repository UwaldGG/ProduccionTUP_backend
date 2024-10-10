// db/models/tareas.model.js
const { Model, DataTypes } = require('sequelize');

const TAREAS_TABLE = 'tareas';

class Tarea extends Model {
  static associate(models) {
    this.hasMany(models.EmpleadosTareas, { as: 'empleados_tareas', foreignKey: 'fk_tarea'});
  }

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
  ID_Tarea: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = { Tarea, TareasSchema };
