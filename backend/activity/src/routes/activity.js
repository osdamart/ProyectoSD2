const express = require("express");
const Actividad = require("../models/ActivityModel");
const router = new express.Router();

router.get("/activity", async (_, res) => {
  try {
    const newsReceived = await Actividad.find({}).sort({ _id: -1 });
    console.log(newsReceived);
    res.status(201).send({ newsReceived });
  } catch (e) {
    res.status(401).send({ e });
  }
});

router.get("/activity/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const newsReceived = await Actividad.findById(req.params.id);
    console.log(newsReceived);
    res.status(201).send({ newsReceived });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/activitylast", async (_, res) => {
  try {
    const newsReceived = await Actividad.find({}).sort({ _id: -1 }).limit(3);
    console.log("ULTIMAS 3 ACTIVIDADES: " + newsReceived);
    res.status(201).send({ newsReceived });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
