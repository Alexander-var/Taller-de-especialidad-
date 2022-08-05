const { RolesModulo, Modulo } = require("../models/index");

module.exports = {
  async index(req, res) {
    console.log(req.rol);
    try {
      const response = await RolesModulo.findAll({
        where: { idRol: req.rol },
        include: [
          {
            model: Modulo,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Server error",
      });
    }
  },
};
