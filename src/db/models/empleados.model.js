// db/models/persona_responsable.model.js
const { Model, DataTypes } = require('sequelize');
//const sequelize = require('../libs/sequelize');

const EMPLEADOS_TABLE = 'empleados';

class Empleado extends Model {
  static associate(models) {
    this.belongsTo(models.distritos, { as: 'Distrito', foreignKey: 'fk_distrito'});
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: EMPLEADOS_TABLE,
      modelName: 'Empleado',
      timestamps: false,
    };
  }
}

const EmpleadoSchema = {
  ID_Empleado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fk_distrito: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
};

module.exports = { Empleado, EmpleadoSchema};
