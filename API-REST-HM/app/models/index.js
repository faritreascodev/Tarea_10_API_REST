const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// Definimos las colecciones de la base de datos
db.estudiantes = require("./info_estudiantes.model.js")(mongoose);

module.exports = db;