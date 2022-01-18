const express = require("express");
const Noticia = require("../models/NewsModel");
const router = new express.Router();

router.get("/news", async (_, res) => {
  try {
    const newsReceived = await Noticia.find({}).sort({ fecha: -1 });
    console.log(newsReceived);
    res.status(201).send({ newsReceived });
  } catch (e) {
    res.status(401).send({ message: "Error" });
  }
});

router.get("/news/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const newsReceived = await Noticia.findById(req.params.id);
    console.log(newsReceived);
    res.status(201).send({ newsReceived });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/newslast", async (_, res) => {
  try {
    const newsReceived = await Noticia.find({}).sort({ fecha: -1 }).limit(2);
    console.log("ULTIMAS 2 NOTICIAS: " + newsReceived);
    res.status(201).send({ newsReceived });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
