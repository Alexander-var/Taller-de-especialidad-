const {
  Profesor,
  Persona,
  Curso,
  Materia,
  CursoMarteria,
} = require("../models/index");

module.exports = {
  async index(req, res) {
    try {
      const response = await Curso.findAll({
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
    const { idMaterias } = req.body;
    const validarMaterias = [];
    const introItems = [];
    try {

      for (let i = 0; i < idMaterias.length; i++) {
        validarMaterias.push(
          Materia.findOne({ where: { id: idMaterias[i], estado: 1 } })
        );
      }

      const responseMaterias = await Promise.all(validarMaterias);
      if (responseMaterias.includes(null)) {
        return res.status(404).json({
          message: "Revice los ids de Materias, no se encontro una materia",
        });
      }
      const response = await Curso.create(req.body);
      for (let i = 0; i < idMaterias.length; i++) {
        introItems.push(
          CursoMarteria.create({
            idCurso: response.id,
            idMateria: idMaterias[i],
          })
        );
      }
      await Promise.all(introItems);

      res.status(200).json({
        message:'El curso fue registrado',
        response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error en la request",
      });
    }
  },
  // TODO: funciona para actualizar
  async update(req, res) {
    const { idMaterias } = req.body;
    const validarMaterias = [];
    const introItems = [];

    try {
      // const idResponse = await Curso.findOne({
      //   where: {
      //     id: req.params.id,
      //   },
      // });

      // if (!idResponse) {
      //   return res.status(404).json({
      //     message: `El id ${req.params.id} no se encuentra en la DB`,
      //   });
      // }

      for (let i = 0; i < idMaterias.length; i++) {
        validarMaterias.push(
          Materia.findOne({ where: { id: idMaterias[i], estado: 1 } })
        );
      }
      const responseMaterias = await Promise.all(validarMaterias);
      if (responseMaterias.includes(null)) {
        return res.status(404).json({
          message: "Revice los ids de Materias, no se encontro una materia",
        });
      }

      await CursoMarteria.destroy({
        where: { idCurso: req.params.id },
      });

      for (let i = 0; i < idMaterias.length; i++) {
        introItems.push(
          CursoMarteria.create({
            idCurso: req.params.id,
            idMateria: idMaterias[i],
          })
        );
      }
      await Promise.all(introItems);

      await Curso.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(201).json({
        message: "Curso Actualizado",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  },

  async delete(req, res) {
    try {
      // const idResponse = await Curso.findOne({
      //   where: {
      //     id: req.params.id,
      //   },
      // });

      // if (!idResponse) {
      //   return res.status(404).json({
      //     message: `El id ${req.params.id} no se encuentra en la DB`,
      //   });
      // }

      await Curso.destroy({ where: { id: req.params.id } });

      res.status(201).json({
        message: "El Curso se elimino correctamente",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  },

  async show(req, res) {
    try {
      const response = await Curso.findOne({
        where: {
          id: req.params.id,
        },
        attributes: { exclude: ["createdAt", "updatedAt", "idProfesor"] },
        include:[{model:CursoMarteria, include:[{model:Materia}]}]
      });
      if (!response)
        return res.status(404).json({
          message: `El Curso con el id ${req.params.id} no existe`,
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
};
