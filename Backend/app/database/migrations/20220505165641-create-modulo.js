'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('modulos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      seccion: {
        type: Sequelize.STRING
      },
      icono: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('modulos');
  }
};