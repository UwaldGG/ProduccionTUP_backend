// src/db/models/index.js
//const { Person, PersonSchema } = require('./persons.model');
const { Distrito, DistritoSchema } = require('./distritos.model');
const { DatosMensuales, DatosMensualesSchema } = require('./datos_mensuales.model');
const { Empleado, EmpleadoSchema } = require('./empleados.model');
const { Asignaciones, AsignacionesSchema } = require('./asignaciones.model');
const { Tarea, TareasSchema } = require('./tareas.model');

function setupModels(sequelize) {
    //Person.init(PersonSchema, Person.config(sequelize));
    Distrito.init(DistritoSchema, Distrito.config(sequelize));
    DatosMensuales.init(DatosMensualesSchema, DatosMensuales.config(sequelize));
    Empleado.init(EmpleadoSchema, Empleado.config(sequelize));
    Asignaciones.init(AsignacionesSchema, Asignaciones.config(sequelize));
    Tarea.init(TareasSchema, Tarea.config(sequelize));

}

module.exports = setupModels;