// db/models/persona_responsable.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize');

const EMPLEADOS_TABLE = 'empleados';

class Empleado extends Model {
  static associate(models) {
    this.belongsTo(models.Distrito, { as: 'distrito', foreignKey: 'fk_distrito' });  // Asegúrate de que el alias sea 'Distrito'
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
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
    field: 'fk_distrito',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
        model: 'distritos',
        key: 'ID_Distrito',
    },
  }
};

module.exports = { Empleado, EmpleadoSchema};
