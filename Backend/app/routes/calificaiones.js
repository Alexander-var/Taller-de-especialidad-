const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

// * MIDDLEWARES
const { validateFields } = require("../middlewares/validateFields");
const { validarToken, validarPermisos } = require("../middlewares/auth");

// * CONTROLLER
const calificaionesController = require("../controllers/CalificacionesController");
const { idExistsInTable } = require("../helpers/db-validate");

// * MODEL
const {Estudiante, Profesor, CursoMarteria }= require('../models/index')


router.get("/", [validarToken, validarPermisos], calificaionesController.index);
router.get("/filtro", [validarToken, validarPermisos], calificaionesController.show);
router.post("/", [validarToken, validarPermisos,
    check("idEstudiante", "Campo idEstudiante es requerido").not().isEmpty(),
    check("idEstudiante").custom((value) => idExistsInTable(value, Estudiante)),

    check("idProfesor", "Campo idProfesor es requerido").not().isEmpty(),
    check("idProfesor").custom((value) => idExistsInTable(value, Profesor)),

    check("idCursoMateria", "Campo idCursoMateria es requerido").not().isEmpty(),
    check("idCursoMateria").custom((value) => idExistsInTable(value, CursoMarteria)),

    // check("tipoConfSer", "Campo tipoConfSer es requerido").not().isEmpty(),
    check("ser", "Campo ser es requerido").not().isEmpty(),
    // check("promedioSer", "Campo promedioSer es requerido").not().isEmpty(),
    // check("tipoConfSaber", "Campo tipoConfSaber es requerido").not().isEmpty(),
    check("saber", "Campo saber es requerido").not().isEmpty(),
    // check("promedioSaber", "Campo promedioSaber es requerido").not().isEmpty(),
    // check("tipoConfHacer", "Campo tipoConfHacer es requerido").not().isEmpty(),
    check("hacer", "Campo hacer es requerido").not().isEmpty(),
    // check("promedioHacer", "Campo promedioHacer es requerido").not().isEmpty(),
    // check("tipoConfDecidir", "Campo tipoConfDecidir es requerido").not().isEmpty(),
    check("decidir", "Campo decidir es requerido").not().isEmpty(),
    // check("promedioDecidir", "Campo promedioDecidir es requerido").not().isEmpty(),
    // check("tipoConfAutoEvaluacion", "Campo tipoConfAutoEvaluacion es requerido").not().isEmpty(),
    check("autoEvaluacion", "Campo autoEvaluacion es requerido").not().isEmpty(),
    // check("promedioAutoEvaluacion", "Campo promedioAutoEvaluacion es requerido").not().isEmpty(),
    // check("promedioGeneral", "Campo promedioGeneral es requerido").not().isEmpty(),
    validateFields,

], calificaionesController.create);


module.exports = router;
