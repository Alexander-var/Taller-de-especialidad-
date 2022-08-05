'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calificaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Estudiante,{
        foreignKey:'idEstudiante'
      })
      this.belongsTo(models.Profesor,{
        foreignKey:'idProfesor'
      })
      this.belongsTo(models.CursoMarteria,{
        foreignKey:'idCursoMateria'
      })
    }
  }
  Calificaciones.init({
    idEstudiante: DataTypes.INTEGER,
    idProfesor: DataTypes.INTEGER,
    idCursoMateria: DataTypes.INTEGER,
    tipoConfSer: DataTypes.INTEGER,
    ser: DataTypes.INTEGER,
    promedioSer: DataTypes.DOUBLE,
    tipoConfSaber: DataTypes.INTEGER,
    saber: DataTypes.INTEGER,
    promedioSaber: DataTypes.DOUBLE,
    tipoConfHacer: DataTypes.INTEGER,
    hacer: DataTypes.INTEGER,
    promedioHacer: DataTypes.DOUBLE,
    tipoConfDecidir: DataTypes.INTEGER,
    decidir: DataTypes.INTEGER,
    promedioDecidir: DataTypes.DOUBLE,
    tipoConfAutoEvaluacion: DataTypes.INTEGER,
    autoEvaluacion: DataTypes.INTEGER,
    promedioAutoEvaluacion: DataTypes.DOUBLE,
    promedioGeneral: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Calificaciones',
  });
  return Calificaciones;
};