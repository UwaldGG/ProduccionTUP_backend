// db/models/persona_responsable.model.js
const { Model, DataTypes } = require('sequelize');
//const sequelize = require('../libs/sequelize');

const PERSONARESPONSABLE_TABLE = 'persona_responsable';

class PersonaResponsable extends Model {
  static config (sequelize) {
    return {
      sequelize,
      tableName: PERSONARESPONSABLE_TABLE,
      modelName: 'PersonaResponsable',
      timestamps: false,
    };
  }
}

const PersonaResponsableSchema = {
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
};

module.exports = { PersonaResponsable, PersonaResponsableSchema};
