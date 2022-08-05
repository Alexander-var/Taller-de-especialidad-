const { CursoMarteria, Estudiante, Persona, Calificaciones, Materia, Curso, Sequelize } = require("../models/index")



module.exports = {

    async create(req, res) {
        const { idEstudiante, idProfesor, idCursoMateria } = req.body
        try {
            const existeCal = await Calificaciones.findOne({
                where: { idEstudiante, idProfesor, idCursoMateria }
            })
            if (existeCal) {
                const response = await Calificaciones.update(req.body, {
                    where: { id: existeCal.id }
                })
                return res.status(200).json({
                    message: "La Calificaion fue actualizada",
                    response,
                });
            }

            const response = await Calificaciones.create(req.body)
            res.status(200).json({
                message: "La Calificaion fue registrada",
                response,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error en el servidor"
            })
        }
    },

    async update(req, res) {

    },

    async index(req, res) {
        try {
            const { idCurso } = req.query
            if (!idCurso) return res.status(400).json({ message: 'Seleccione el Curso correcto' })

            const materiasDelCurso = await CursoMarteria.findAll({
                attributes: [
                    ['id', 'idCursoMateria'],
                    [Sequelize.literal('`Curso`.`nombre`'), 'cursoNombre'],
                    [Sequelize.literal('`Curso`.`paralelo`'), 'paralelo'],
                    [Sequelize.literal('`Materium`.`estado`'), 'estado'],
                    [Sequelize.literal('`Materium`.`id`'), 'id'],
                    [Sequelize.literal('`Materium`.`idProfesor`'), 'idProfesor'],
                    [Sequelize.literal('`Materium`.`nombre`'), 'nombre'],
                    [Sequelize.literal('`Materium`.`sigla`'), 'sigla'],
                ],

                where: {
                    idCurso
                },
                include: [
                    {
                        attributes: [],
                        model: Materia,
                    },
                    {
                        attributes: [],
                        model: Curso,
                    }
                ]
            })

            const estudianteCurso = await Estudiante.findAll({
                attributes: [
                    'id',
                    [Sequelize.literal('`Persona`.`nombre`'), 'nombre'],
                    [Sequelize.literal('`Persona`.`apellidoPaterno`'), 'apellidoPaterno'],
                    [Sequelize.literal('`Persona`.`apellidoMaterno`'), 'apellidoMaterno'],
                    [Sequelize.literal('`Persona`.`sexo`'), 'sexo'],
                    [Sequelize.literal('`Persona`.`correo`'), 'correo'],
                    [Sequelize.literal('`Persona`.`fechaNacimiento`'), 'fechaNacimiento'],
                    [Sequelize.literal('`Persona`.`direccion`'), 'direccion'],
                    [Sequelize.literal('`Persona`.`telefono`'), 'telefono'],
                    'rude'
                ],
                where: {
                    idCurso
                },
                include: [

                    { attributes: [], model: Persona }
                ]
            })


            res.status(200).json({
                estudiante: estudianteCurso,
                materias: materiasDelCurso,
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error en el servidor"
            })
        }


    },

    async show(req, res) {
        const { idCursoMateria } = req.query

        try {
            const response = await Calificaciones.findAll({
                attributes: [
                    [
                        Sequelize.literal(
                            '`CursoMarterium->Materium`.`nombre`'
                        ),
                        'nombreMateria'
                    ],

                    'idEstudiante', 'idCursoMateria', 'ser', 'saber', 'hacer', 'decidir', 'autoEvaluacion'],
                where: {
                    idCursoMateria
                },
                include: [
                    {
                        attributes: [],
                        model: CursoMarteria, include: [
                            {
                                attributes: [],
                                model: Materia
                            }
                        ]
                    }
                ]

            })
            res.status(200).json(response)

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error en el server"
            })

        }
    }

}