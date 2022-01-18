var mongoose = require("mongoose");

const noticiasSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
    },
    fecha: {
      type: Date,
    },
    imagen: {
      type: String,
    },
    fuente: {
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

module.exports = mongoose.model("noticias", noticiasSchema);
