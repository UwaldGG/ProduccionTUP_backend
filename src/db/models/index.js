// src/db/models/index.js
//const { Person, PersonSchema } = require('./persons.model');
const { Distrito, DistritoSchema } = require('./distritos.model');
const { EmpleadosTareas, EmpleadosTareasSchema } = require('./empleados_tareas.model');
const { Empleado, EmpleadoSchema } = require('./empleados.model');
const { Tarea, TareasSchema } = require('./tareas.model');

function setupModels(sequelize) {
    //Person.init(PersonSchema, Person.config(sequelize));
    Distrito.init(DistritoSchema, Distrito.config(sequelize));
    EmpleadosTareas.init(EmpleadosTareasSchema, EmpleadosTareas.config(sequelize));
    Empleado.init(EmpleadoSchema, Empleado.config(sequelize));
    Tarea.init(TareasSchema, Tarea.config(sequelize));

    Distrito.associate(sequelize.models);
    Empleado.associate(sequelize.models);
    EmpleadosTareas.associate(sequelize.models);
    Tarea.associate(sequelize.models);
}

module.exports = setupModels;