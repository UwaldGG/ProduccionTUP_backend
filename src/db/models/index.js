// src/db/models/index.js
//const { Person, PersonSchema } = require('./persons.model');
const { Distrito, DistritoSchema } = require('./distritos.model');

function setupModels(sequelize) {
    //Person.init(PersonSchema, Person.config(sequelize));
    Distrito.init(DistritoSchema, Distrito.config(sequelize));
    // Agrega otras inicializaciones de modelos aquí
}

module.exports = setupModels;
