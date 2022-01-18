const express = require("express");
const Contact = require("../models/ContactModel");
const router = new express.Router();

router.post("/contact/create", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(200).send({ newContact });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
