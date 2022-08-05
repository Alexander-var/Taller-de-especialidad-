"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Mes",
      [
        {
          nombre: "Enero",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Febrero",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Marzo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Abril",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Mayo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Junio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Julio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Agosto",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Septiembre",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Octubre",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Noviembre",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Diciembre",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Mes", null, {});
  },
};
