const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

// * MIDDLEWARES
const { validateFields } = require("../middlewares/validateFields");
const { validarToken, validarPermisos } = require("../middlewares/auth");

// * CONTROLLER
const cursosController = require("../controllers/CursosController");


router.get("/", [validarToken, validarPermisos], cursosController.index);
router.post(
  "/",
  [
    validarToken,
    validarPermisos,
    check("nombre", "El nombre es Requerido").trim().escape().not().isEmpty(),
    check("paralelo", "El paralelo es Requerido")
      .trim()
      .escape()
      .not()
      .isEmpty(),
    check("nivel", "El nivel es Requerido").trim().escape().not().isEmpty(),
    
    check("idMaterias", "Debe introducir al menos una materia").not().isEmpty(),
    check("idMaterias", "Este campo es de tipo arreglo").isArray(),
    validateFields,
  ],
  cursosController.create
);
router.put(
  "/:id",
  [
    validarToken,
    validarPermisos,
    check("nombre", "El nombre es Requerido").trim().escape().not().isEmpty(),
    check("paralelo", "El paralelo es Requerido")
      .trim()
      .escape()
      .not()
      .isEmpty(),
    check("nivel", "El nivel es Requerido").trim().escape().not().isEmpty(),
    check("idMaterias", "Debe introducir al menos una materia").not().isEmpty(),
    check("idMaterias", "Este campo es de tipo arreglo").isArray(),
    validateFields,
  ],
  cursosController.update
);

router.get("/:id", [validarToken, validarPermisos], cursosController.show);

router.delete("/:id", [validarToken, validarPermisos], cursosController.delete);

module.exports = router;
