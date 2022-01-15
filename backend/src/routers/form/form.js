const express = require("express");
const { ReplSet } = require("mongodb");
const Formulario = require("../../models/form");
const User = require('../../models/users')
const { checkToken } = require("../../utils/utils")
const { imageSaver } = require("../../utils/image")

const router = new express.Router();

router.get("/api/v1/form", async (req, res) => {
  try {
    const headers = (req.headers)
    console.log("HEAD", headers.token)
    const validation = await checkToken(Number(headers.token))
    console.log("VALID", validation)
    if (validation) {

      //try
      const formReceived = await Formulario.find({});

      res.status(201).send({ formReceived });
    } else {
      res.status(401).send({ message: "No autorizado" })
    }
  } catch (error) {
    console.log(error)
  }


});

//crear
router.post("/api/v1/form/create", async (req, res) => {

  try {
    const headers = (req.headers)
    const validation = await checkToken(Number(headers.token))
    if (validation) {
      const newFormulario = new Formulario(req.body);
      if (req.body.cedula) {
        newFormulario.cedula = imageSaver(req.body.nombre.trim().replace(" ", "") + "_cedula", req.body.cedulaExt, "miembros", req.body.cedula)
      }
      if (req.body.inscripcion) {
        newFormulario.inscripcion = imageSaver(req.body.nombre.trim().replace(" ", "") + "_formulario", req.body.formExt, "miembros", req.body.inscripcion)
      }
      await newFormulario.save();
      res.status(201).send({ newFormulario });
    } else {
      res.status(401).send({ message: "No autorizado" })
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});



//borrar formulario
router.get("/api/v1/form/delete/:id", async (req, res) => {
  //agregar try catch
  try {
    const formularioReceived = await Formulario.findByIdAndDelete(
      req.params.id
    );
    console.log(formularioReceived);
    res.status(201).send({ formularioReceived });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//update formulario
router.post("/api/v1/form/update", async (req, res) => {
  //agregar try catch
  try {
    if (req.body.cedula) {
      req.body.cedula = imageSaver(req.body.nombre.trim().replace(" ", "") + "_cedula", req.body.cedulaExt, "miembros", req.body.cedula)
    }

    await Formulario.updateOne(
      { _id: req.body._id },
      {
        $set: req.body
      }
    );
    const formularioReceived = await Formulario.findById({ _id: req.body._id });
    console.log(formularioReceived);
    res.status(201).send({ formularioReceived });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
