const express = require("express");
require("dotenv").config();
const router = require("./src/routes/form");
require("./src/db/mongoose");

var cors = require("cors");
const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("./public"));

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
