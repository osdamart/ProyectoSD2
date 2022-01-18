const express = require("express");
const Formulario = require("../models/FormModel");
const router = new express.Router();
const { imageSaver } = require("../utils/image");

router.post("/form/create", async (req, res) => {
  try {
    const newFormulario = new Formulario(req.body);
    if (req.body.cedula) {
      newFormulario.cedula = imageSaver(
        req.body.nombre.trim().replace(" ", "") + "_cedula",
        req.body.cedulaExt,
        "miembros",
        req.body.cedula
      );
    }
    if (req.body.inscripcion) {
      newFormulario.inscripcion = imageSaver(
        req.body.nombre.trim().replace(" ", "") + "_formulario",
        req.body.formExt,
        "miembros",
        req.body.inscripcion
      );
    }
    await newFormulario.save();
    res.status(201).send({ newFormulario });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
