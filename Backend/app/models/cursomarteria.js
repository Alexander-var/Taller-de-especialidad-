"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CursoMarteria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Curso, {
        foreignKey: "idCurso",
      });
      this.belongsTo(models.Materia, {
        foreignKey: "idMateria",
      });
    }
  }
  CursoMarteria.init(
    {
      idCurso: DataTypes.INTEGER,
      idMateria: DataTypes.INTEGER,
      estado: DataTypes.BOOLEAN,
      fecha: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "CursoMarteria",
    }
  );
  return CursoMarteria;
};
