var mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
    },
    correo: {
      type: String,
    },
    telefono: {
      type: String,
    },
    asunto: {
      type: String,
    },
    mensaje: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactSchema);
