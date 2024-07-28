module.exports = app => {
    const estudiantes = require("../controllers/info_estudiantes.controller.js");

    var router = require("express").Router();

    // Retrieve all Student
    router.get("/", estudiantes.findAll);

    // Create a new Student
    router.post("/", estudiantes.create);

    // Recover a single Student with ID
    router.get("/:id", estudiantes.findOne)

    // Update a student with ID
    router.put("/:id", estudiantes.update);

    // Delete a student with ID
    router.delete("/:id", estudiantes.delete);

    app.use('/api/estudiantes', router);
};