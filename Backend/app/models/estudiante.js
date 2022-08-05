'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Persona,{
        foreignKey:'idPersona'
      })
      this.belongsTo(models.Tutor,{
        foreignKey:'idTutor'
      })
    }
  }
  Estudiante.init({
    idPersona: DataTypes.INTEGER,
    rude: DataTypes.STRING,
    idTutor: DataTypes.INTEGER,
    idCurso: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Estudiante',
  });
  return Estudiante;
};