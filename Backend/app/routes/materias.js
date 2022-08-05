const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

// * MIDDLEWARES
const { validateFields } = require("../middlewares/validateFields");
const { validarToken, validarPermisos } = require("../middlewares/auth");
const { idExistsInTable } = require("../helpers/db-validate");

// * CONTROLLER
const materiaController = require("../controllers/MateriaController");

// * MODELS
const { Profesor } = require("../models/index");

router.get("/", [validarToken, validarPermisos], materiaController.index);
router.get("/filtro", [validarToken, validarPermisos], materiaController.filtro);
router.post(
  "/",
  [
    validarToken,
    validarPermisos,
    check("nombre", "El nombre es Requerido").trim().escape().not().isEmpty(),
    check("sigla", "La sigla es Requerida").trim().escape().not().isEmpty(),
    check("idProfesor").custom((id) => idExistsInTable(id, Profesor)),
    validateFields,
  ],
  materiaController.create
);
router.put(
  "/:id",
  [
    validarToken,
    validarPermisos,
    check("nombre", "El nombre es Requerido").trim().escape().not().isEmpty(),
    check("sigla", "La sigla es Requerida").trim().escape().not().isEmpty(),
    check("idProfesor").custom((id) => idExistsInTable(id, Profesor)),

    validateFields,
  ],
  materiaController.update
);

router.get("/:id", [validarToken, validarPermisos], materiaController.show);

router.delete(
  "/:id",
  [validarToken, validarPermisos],
  materiaController.delete
);

module.exports = router;
