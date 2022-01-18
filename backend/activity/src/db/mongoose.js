const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_PATH,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Conexion con base de datos exitosa.");
  }
);
