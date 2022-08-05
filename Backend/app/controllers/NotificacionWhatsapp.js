const { Notificaiones } = require("../models/index")

module.exports = {
    async index(req, res) {
        try {
            const response = await Notificaiones.findAll({
                attributes: { exclude: ["createdAt", "updatedAt", "idProfesor"] },
            });
            res.status(200).json({
                response,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error en la request",
            });
        }
    },
    async create(req, res) {
        try {
            const response = await Notificaiones.create(req.body);
            res.status(200).json({
                message:'Notificacion enviada',
                response,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error en la request",
            });
        }
    },
}