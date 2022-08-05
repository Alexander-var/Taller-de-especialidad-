'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notificaiones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notificaiones.init({
    idPersona: DataTypes.INTEGER,
    fechaEnvio: DataTypes.DATE,
    documento: DataTypes.STRING,
    recibido: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Notificaiones',
  });
  return Notificaiones;
};