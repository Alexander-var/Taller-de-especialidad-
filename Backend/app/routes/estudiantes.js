const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

// * MIDDLEWARES
const { validateFields } = require("../middlewares/validateFields");
const { validarToken, validarPermisos } = require("../middlewares/auth");

// * CONTROLLER
const estudiantesController = require("../controllers/EstudiantesController");
const { idExistsInTable } = require("../helpers/db-validate");

// * MODEL
const { Tutor, Curso } = require("../models/index");

router.get("/", [validarToken, validarPermisos], estudiantesController.index);
router.put(
  "/:id",
  [
    validarToken,
    validarPermisos,
    check("nombre", "El nombre es Requerido").trim().escape().not().isEmpty(),
    check("correo", "El correo es Requerido").trim().escape().not().isEmpty(),
    check("correo", "El correo debe tener un formato correcto")
      .trim()
      .escape()
      .isEmail(),
    check("apellidoPaterno", "El Apellido Paterno es Requerido")
      .trim()
      .escape()
      .optional({ nullable: true }),
    check("apellidoMaterno", "El Apellido Materno es Requerido")
      .trim()
      .escape()
      .optional({ nullable: true }),
    check("rude", "El Rude es Requerido").trim().escape().not().isEmpty(),
    check("idTutor").custom((value) => idExistsInTable(value, Tutor)),
    check("idCurso").custom((value) => idExistsInTable(value, Curso)),

    check("sexo", "Los valores admitidos son Masculino, Femenino")
      .isIn(["Masculino", "Femenino"])
      .optional({ nullable: true }),
    validateFields,
  ],
  estudiantesController.update
);

router.get("/:id", [validarToken, validarPermisos], estudiantesController.show);

router.delete(
  "/:id",
  [validarToken, validarPermisos],
  estudiantesController.delete
);

module.exports = router;
