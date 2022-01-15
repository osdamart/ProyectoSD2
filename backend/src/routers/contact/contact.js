const express = require('express')
const { ReplSet } = require('mongodb')
const Contact = require('../../models/contact')
const User = require('../../models/users')
const router = new express.Router()
const { checkToken } = require("../../utils/utils")

router.post('/api/v1/contact/create', async (req, res) => {
    const headers = (req.headers)
    const validation = await checkToken(Number(headers.token))
    if (validation) {
        const newContact = new Contact(req.body);
        try {
            await newContact.save();
            res.status(200).send({ newContact });
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    } else {
        res.status(401).send({ message: "No autorizado" })
    }
})

router.get('/api/v1/contact', async (req, res) => { //try 

    const headers = (req.headers)
    console.log("HEAD", headers.token)
    const validation = await checkToken(Number(headers.token))
    console.log("VALID", validation)
    
    if (validation) {

        const contactReceived = await Contact.find({})
        console.log(contactReceived);
        res.status(201).send({ contactReceived })
    } else {
        res.status(401).send({ message: "No autorizado" })
    }

})



//borrar contacto
router.get('/api/v1/contact/delete/:id', async (req, res) => { //agregar try catch
    try {
        const contactReceived = await Contact.findByIdAndDelete(req.params.id)
        console.log(contactReceived);
        res.status(201).send({ contactReceived });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

})


module.exports = router