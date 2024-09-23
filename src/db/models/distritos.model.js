// src/db/models/distritos.model.js
const { Model, DataTypes } = require('sequelize');

const DISTRITO_TABLE = 'distritos';

class Distrito extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: DISTRITO_TABLE,
            modelName: 'Distrito',
            timestamps: false, // Cambiar a true si necesitas createdAt y updatedAt
        };
    }
}

const DistritoSchema = {
    ID_Distrito: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    Coordinador: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    NombreDistrito: {
        allowNull: false,
        type: DataTypes.STRING,
    },
};

module.exports = { Distrito, DistritoSchema };
