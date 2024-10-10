// src/db/models/distritos.model.js
const { Model, DataTypes } = require('sequelize');
//const sequelize = require('../../libs/sequelize');
const { Empleado } = require('./empleados.model')

const DISTRITO_TABLE = 'distritos';

class Distrito extends Model {
    static associate(models) {
        this.hasMany(models.Empleado, { as: 'empleados', foreignKey: 'fk_distrito' });
        this.hasMany(models.EmpleadosTareas, { as: 'empleados_tareas', foreignKey: 'fk_distrito'})
   }

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
    Contrasenia: {
        allowNull: false,
        type: DataTypes.STRING,
    }
};

module.exports = { Distrito, DistritoSchema };
