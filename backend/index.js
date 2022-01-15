const path = require('path');
const express = require('express')
require('dotenv').config()
require('./src/db/mongoose')
const userRouter = require('./src/routers/users/users')
require('./src/db/mongoose')
var multer = require('multer'); // v1.0.5

// var formRouter = require('./public/index.html')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

var upload = multer(); // for parsing multipart/form-data

app.use(cors());
app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));
app.use(userRouter)


// app.use("/testForm", formRouter)

// app.get('/api/v1/sign-in', (req, res) => {
//     console.log("SIGNED IN")
//     res.send({ status: true, msg: "LOGEADO CORRECTAMENTE" })
// });

const newRouter = require('./src/routers/news/news')
const newRouterActivity = require('./src/routers/activity/activity')
const newRouterForm = require('./src/routers/form/form');
const newRouterContact = require('./src/routers/contact/contact');
app.use(express.static('./public'));

// const { dirname } = require('path/posix');


app.use(newRouter)
app.use(newRouterActivity)
app.use(newRouterForm)
app.use(newRouterContact)
// app.use(function (req, res, next) {
//     next(createError(404))
// })
// app.get('/', function (req, rez) {
//     res.sendFile(path.join)
// })




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


