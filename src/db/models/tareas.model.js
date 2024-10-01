// db/models/tareas.model.js
const { Model, DataTypes } = require('sequelize');

const TAREAS_TABLE = 'tareas';

class Tarea extends Model {
  static associate(models) {
    this.belongsTo(models.Distrito, { as: 'distrito', foreignKey: 'fk_distrito' });  // Asegúrate de que el alias sea 'Distrito'
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
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fk_distrito: {
    field: 'fk_distrito',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'distritos',
      key: 'ID_Distrito',
    },
  }
};

module.exports = { Tarea, TareasSchema };
