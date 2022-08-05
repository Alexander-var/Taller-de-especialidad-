"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.hasMany(models.CursoMarteria, {
        foreignKey: "idCurso",
      });
    }
  }
  Curso.init(
    {
      nombre: DataTypes.STRING,
      paralelo: DataTypes.STRING,
      nivel: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Curso",
    }
  );
  return Curso;
};
