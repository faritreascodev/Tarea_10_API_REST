module.exports = mongoose => {
    const Estudiante = mongoose.model(
        "info_estudiantes", //Referencias a la colección real
        mongoose.Schema(
            {
                cedula: String,
                apellido: String,
                nombre: String,
                edad: Number,
                en_pareja: Boolean
            },
            { timestamps: true }
        ),
        "info_estudiantes" //Referencias a la colección real
    );

    return Estudiante;
};