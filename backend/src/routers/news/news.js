const express = require("express");
const { ReplSet } = require("mongodb");
const Noticia = require("../../models/news");
const User = require('../../models/users')
const { checkToken } = require("../../utils/utils")
const router = new express.Router();
const { imageSaver } = require("../../utils/image")

router.get("/api/v1/news", async (req, res) => {
  const headers = (req.headers)
  console.log("HEAD", headers.token)
  const validation = await checkToken(Number(headers.token))
  console.log("VALID", validation)

  if (validation) {
    const newsReceived = await Noticia.find({}).sort({ fecha: -1 })
    console.log(newsReceived);
    res.status(201).send({ newsReceived });
  } else {
    res.status(401).send({ message: "No autorizado" })
  }



});

router.post("/api/v1/news/create", async (req, res) => {
  const newNoticia = new Noticia(req.body);
  try {
    let ts = Date.now();
    if (req.body.imagen) {
      newNoticia.imagen = imageSaver(ts, req.body.noticiaExt, "noticias", req.body.imagen)
    }

    await newNoticia.save();
    res.status(201).send({ newNoticia });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});



router.get("/api/v1/news/:id", async (req, res) => {
  //agregar try catch
  try {
    const newsReceived = await Noticia.findById(req.params.id);
    console.log(newsReceived);
    res.status(201).send({ newsReceived });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/api/v1/newslast", async (req, res) => {
  try {
    const newsReceived = await Noticia.find({}).sort({ _id: -1 }).limit(2);
    console.log("ULTIMAS 2 NOTICIAS: " + newsReceived);
    res.status(201).send({ newsReceived });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//borrar noticia
router.get("/api/v1/news/delete/:id", async (req, res) => {
  //agregar try catch
  try {
    const newsReceived = await Noticia.findByIdAndDelete(req.params.id);
    console.log(newsReceived);
    res.status(201).send({ newsReceived });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//update
router.post("/api/v1/news/update", async (req, res) => {
  //agregar try catch
  try {
    let ts = Date.now();

    if (req.body.imagen) {
      req.body.imagen = imageSaver(ts, req.body.noticiaExt, "noticias", req.body.imagen)
    }
    let newsReceived = await Noticia.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: req.body
      }
    );
    newsReceived = await Noticia.findById({ _id: req.body._id });
    res.status(201).send({ newsReceived });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
