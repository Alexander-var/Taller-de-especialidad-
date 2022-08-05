const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

// * MIDDLEWARES
// const { validateFields } = require("../middlewares/validateFields");
const { validarToken, validarPermisos } = require("../middlewares/auth");

// * CONTROLLER
const principalController = require("../controllers/PrincipalController");

router.get("/", [validarToken, validarPermisos], principalController.index);

module.exports = router;
