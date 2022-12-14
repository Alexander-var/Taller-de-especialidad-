const {
  Persona,
  Profesor,
  Role,
  Tutor,
  Estudiante,
  Curso
} = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  async register(req, res) {
    const { clave, correo, rol } = req.body;
    let nombreRol;
    try {
      // TODO: verificamos que no exista un usuario con ese correo
      // const usuarioExiste = await Persona.findOne({
      //   where: {
      //     correo,
      //   },
      // });
      // if (usuarioExiste) {
      //   return res.status(404).json({ message: "Este Correo ya existe" });
      // }
      // TODO: hasheamos clave
      const claveNueva = await bcrypt.hash(clave, 10);

      // TODO: verificamos si el rol introducido existe en la tabla de roles
      if (rol) {
        const roles = await Role.findOne({
          where: {
            id: rol,
            activo: 1,
          },
        });
        if (!roles)
          return res.status(404).json({ message: "El rol no existe en la DB" });
        nombreRol = roles.nombre;
      } else {
        nombreRol = null;
      }
      // * si nombreRol es estudiante
      if (nombreRol === "Estudiante") {
        const { rude, idTutor, idCurso } = req.body;
        if (!rude)
          return res
            .status(404)
            .json({ message: "Para registrar un estudiante necesita el rude" });
        // verificamos el tutor
        if (!idTutor)
          return res.status(404).json({
            message: "Para registrar un estudiante necesita un idTutor",
          });
        if (!idCurso)
          return res.status(404).json({
            message: "Para registrar un estudiante necesita Selecionar El curso",
          });

        const tutorResponse = await Tutor.findOne({
          where: {
            id: idTutor,
          },
        });
        if (!tutorResponse)
          return res.status(404).json({
            message: "El tutor no existe en la base de datos",
          });
        // const CursoResponse = await Curso.findOne({
        //   where: {
        //     id: idCurso,
        //   },
        // });
        // if (!CursoResponse)
        //   return res.status(404).json({
        //     message: "El Curso no existe en la base de datos",
        //   });
      }

      // TODO: Creamos usuario
      const persona = await Persona.create({
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        sexo: req.body.sexo,
        fechaNacimiento: req.body.fechaNacimiento,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        nroDip: req.body.nroDip,
        usuario: req.body.usuario,
        clave: claveNueva,
        idRol: rol ? rol : null,
        correo,
      });

      // * si nombreRol es profesor
      if (nombreRol === "Profesor") {
        await Profesor.create({ idPersona: persona.id, RDA: req.body.RDA });
      }

      if (nombreRol === "Estudiante") {
        const { rude, idTutor, idCurso } = req.body;
        if (!rude)
          return res
            .status(404)
            .json({ message: "Para registrar un estudiante necesita el rude" });

        await Estudiante.create({ idPersona: persona.id, rude, idTutor, idCurso });
      }

      // * si nombreRol es null
      if (nombreRol === null) {
        await Tutor.create({ idPersona: persona.id });
      }

      res.status(201).json({
        message: `El usuario ${nombreRol ? nombreRol : "Tutor"
          } se creo exitosamente`,
        persona,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: "Error en la request",
      });
    }
  },

  async login(req, res) {
    const { usuario, clave } = req.body;
    // TODO: verificar si el usuario existe
    const userExiste = await Persona.findOne({
      where: { usuario },
    });
    if (!userExiste)
      return res
        .status(404)
        .json({ message: "Los datos introducidos no existen" });
    // TODO sacamos el rol para ver si tiene un rol asignado
    if (userExiste.idRol === null) {
      return res
        .status(404)
        .json({ message: "El usuario no tiene un rol Asignado" });
    }
    // TODO comparar contrase??as
    const compararClaves = await bcrypt.compare(clave, userExiste.clave);
    // TODO generar el jwt con los datos del usuario  si compararClaves es true
    if (compararClaves) {
      tokenUser = jwt.sign(
        {
          id: userExiste.id,
          nombre: userExiste.nombre,
          usuario: userExiste.usuario,
          correo: userExiste.correo,
          rol: userExiste.idRol,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "4h",
        }
      );
      return res.status(200).json({
        token: tokenUser,
        id: userExiste.id,
        nombre: userExiste.nombre,
        usuario: userExiste.usuario,
        correo: userExiste.correo,
        rol: userExiste.idRol,
      });
    }
    // TODO devolvemos el json
  },
};
