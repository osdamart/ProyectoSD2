const express = require('express')
const { ReplSet } = require('mongodb')
const Actividad = require('../../models/activity')
const router = new express.Router()
const mongodb = require('mongodb')
const { checkToken } = require("../../utils/utils")
const { imageSaver } = require("../../utils/image")



router.get('/api/v1/activity', async (req, res) => { //try 
    const headers = (req.headers)
    console.log("HEAD", headers.token)
    const validation = await checkToken(Number(headers.token))
    console.log("VALID", validation)
    if (validation) {

        const newsReceived = await Actividad.find({}).sort({ _id: -1 })
        console.log(newsReceived);
        res.status(201).send({ newsReceived })
    } else {
        res.status(401).send({ message: "No autorizado" })
    }


})

router.post('/api/v1/activity/create', async (req, res) => {
    const newActividad = new Actividad(req.body);
    let ts = Date.now();

    try {
        if (req.body.imagen) {
            newActividad.imagen = imageSaver(ts, req.body.actividadExt, "actividades", req.body.imagen)
        }
        await newActividad.save();
        res.status(201).send({ newActividad });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})

router.get('/api/v1/activity/:id', async (req, res) => { //agregar try catch
    try {
        const newsReceived = await Actividad.findById(req.params.id)
        console.log(newsReceived);
        res.status(201).send({ newsReceived });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

})

router.get('/api/v1/activitylast', async (req, res) => {
    try {
        const newsReceived = await Actividad.find({}).sort({ _id: -1 }).limit(3)
        console.log("ULTIMAS 3 ACTIVIDADES: " + newsReceived)
        res.status(201).send({ newsReceived })
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})


//borrar actividad
router.get('/api/v1/activity/delete/:id', async (req, res) => { //agregar try catch
    try {
        const actividadReceived = await Actividad.findByIdAndDelete(req.params.id)
        console.log(actividadReceived);
        res.status(201).send({ actividadReceived });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

})

//update actividad
router.post('/api/v1/activity/update', async (req, res) => { //agregar try catch
    try {
        let ts = Date.now();

        if (req.body.imagen) {
            req.body.imagen = imageSaver(ts, req.body.actividadExt, "actividades", req.body.imagen)
        }
        await Actividad.updateOne(
            { _id: req.body._id },
            {
                $set: req.body
            }
        );
        const actividadReceived = await Actividad.findById({ _id: req.body._id });
        console.log(actividadReceived);
        res.status(201).send({ actividadReceived });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

})


module.exports = router