"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Persona, {
        foreignKey: "idPersona",
      });

      // * Relacion con estudiante
      this.hasMany(models.Estudiante, {
        foreignKey: "idTutor",
      });
    }
  }
  Tutor.init(
    {
      idPersona: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tutor",
    }
  );
  return Tutor;
};
