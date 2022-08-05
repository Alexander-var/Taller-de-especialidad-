'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Calificaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idEstudiante: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Estudiantes',
          id: 'id'
        }
      },
      idProfesor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Profesors',
          id: 'id'
        }
      },
      idCursoMateria: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CursoMarteria',
          id: 'id'
        }
      },
      tipoConfSer: {
        type: Sequelize.INTEGER
      },
      ser: {
        type: Sequelize.INTEGER
      },
      promedioSer: {
        type: Sequelize.DOUBLE
      },
      tipoConfSaber: {
        type: Sequelize.INTEGER
      },
      saber: {
        type: Sequelize.INTEGER
      },
      promedioSaber: {
        type: Sequelize.DOUBLE
      },
      tipoConfHacer: {
        type: Sequelize.INTEGER
      },
      hacer: {
        type: Sequelize.INTEGER
      },
      promedioHacer: {
        type: Sequelize.DOUBLE
      },
      tipoConfDecidir: {
        type: Sequelize.INTEGER
      },
      decidir: {
        type: Sequelize.INTEGER
      },
      promedioDecidir: {
        type: Sequelize.DOUBLE
      },
      tipoConfAutoEvaluacion: {
        type: Sequelize.INTEGER
      },
      autoEvaluacion: {
        type: Sequelize.INTEGER
      },
      promedioAutoEvaluacion: {
        type: Sequelize.DOUBLE
      },
      promedioGeneral: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('Calificaciones');
  }
};