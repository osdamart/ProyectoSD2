var mongoose = require("mongoose");

const actividadesSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
    },
    imagen: {
      type: String,
    },
    descripcion: {
      type: String,
    },
    alternativo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("actividades", actividadesSchema);
