// db/models/asignaciones.model.js
const { Model, DataTypes } = require('sequelize');

const ASIGNACIONES_TABLE = 'asignaciones';

class Asignaciones extends Model {
    static config(sequelize) {
      return {
        sequelize,
        tableName: ASIGNACIONES_TABLE,
        modelName: 'Asignaciones',
        timestamps: false,
      };
    }

}

const AsignacionesSchema = {
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
};

module.exports = { Asignaciones, AsignacionesSchema };
