// db/models/persona_responsable.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../libs/sequelize');

class PersonaResponsable extends Model {}

PersonaResponsable.init({
  ID_Persona_responsable: {
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
}, {
  sequelize,
  modelName: 'PersonaResponsable',
  tableName: 'persona_responsable',
  timestamps: false,
});

module.exports = PersonaResponsable;
