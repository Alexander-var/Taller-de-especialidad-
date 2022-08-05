"use strict";
// const { rolesModulo } = require("../../models/index");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Modulos", modulos);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Modulos", null, {});
  },
};

const modulos = [
  {
    nombre: "Modulo Profesores",
    url: "/api/v1/profesores",
    seccion: "Colegio",
    icono: 'bi bi-person-check',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nombre: "Modulo Materias",
    url: "/api/v1/materias",
    seccion: "Colegio",
    icono: 'bi bi-calculator',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nombre: "Modulo Cursos",
    url: "/api/v1/cursos",
    seccion: "Colegio",
    icono: 'bi bi-book',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nombre: "Modulo Calificaciones",
    url: "/api/v1/calificaciones",
    seccion: "Colegio",
    icono: 'bi bi-card-checklist',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nombre: "Modulo Horarios",
    url: "/api/v1/horarios",
    seccion: "Colegio",
    icono: 'bi bi-hr',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nombre: "Modulo Tutores",
    seccion: "Personas",
    url: "/api/v1/tutores",
    icono: "bi bi-person-lines-fill",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nombre: "Modulo Estudiantes",
    url: "/api/v1/estudiantes",
    seccion: "Personas",
    icono: "bi bi-person-plus",
    createdAt: new Date(),
    updatedAt: new Date(),
  },


  {
    nombre: "Home",
    url: "/api/v1/principal",
    seccion: 'Principal',
    icono: "bi bi-house",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    nombre: "Notificaciones",
    url: "/api/v1/notificaciones",
    seccion: 'Colegio',
    icono: "bi bi-send-plus",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

];