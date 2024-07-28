const db = require("../models");
const Estudiantes = db.estudiantes;

// Create and Save a new Students
exports.create = (req, res) => {
    // Validar la solicitud
    if (!req.body.cedula) {
        return res.status(400).send({ status: false, message: "Falta el contenido de Cédula" });
    }
    if (!req.body.apellido) {
        return res.status(400).send({ status: false, message: "Falta el contenido de Apellido" });
    }
    if (!req.body.nombre) {
        return res.status(400).send({ status: false, message: "Falta el contenido de Nombre" });
    }
    if (!req.body.edad) {
        return res.status(400).send({ status: false, message: "Falta el contenido de Edad" });
    }
    if (!req.body.en_pareja) {
        return res.status(400).send({ status: false, message: "Falta el contenido de En relación" });
    }
    // Creando el objeto Estudiante
    const estudiante = new Estudiantes({
        cedula: req.body.cedula,
        apellido: req.body.apellido,
        nombre: req.body.nombre,
        edad: req.body.edad,
        en_pareja: req.body.en_pareja,
        
    });
    // Guardar Estudiante en la base de datos
    estudiante
        .save(estudiante)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al crear Estudiante."
            });
        });
};

// Find a single Students with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Estudiantes.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No se encontró al estudiante con id:  " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error al recuperar el Estudiante con id=" + id });
        });
};

// Update a Students by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "¡Los datos a actualizar no pueden estar vacíos!"
        });
    }

    const id = req.params.id;

    Estudiantes.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    status: false, message: `No se puede actualizar el estudiante con id=${id}. ¡Quizás no se encontró el Estudiante!`
                });
            } else res.send({ status: true, message: "La colección (info_estudiante) se actualizó correctamente." });
        })
        .catch(err => {
            res.status(500).send({
                status: false, message: "Error al actualizar el Estudiante con id=" + id
            });
        });
};

// Delete a Students with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Estudiantes.findOneAndDelete(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    status: false, message: `No se puede eliminar el Estudiante con id=${id}. ¡Quizás no se encontró el Estudiante!`
                });
            } else {
                res.send({
                    status: true, message: "¡El Estudiante fue eliminado exitosamente!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: false, message: "No se pudo eliminar el Estudiante con id=" + id
            });
        });
};

// Retrieve all Students from the database. [ESTO ES DEL MODELO BASE]
exports.findAll = (req, res) => {
    const apellido = req.query.apellido;
    var condition = apellido ? { apellido: { $regex: new RegExp(apellido), $options: "i" } } : {};

    Estudiantes.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Hubo un error al obtener los datos de Estudiantes."
            });
        });
};