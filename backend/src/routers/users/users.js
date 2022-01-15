const express = require('express')
const User = require('../../models/users')
const auth = require('../../middleware/usersAuth')
// const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()
const mongodb = require('mongodb')






// Sign up
router.post('/api/v1/users', async (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        console.log('ok', token)
        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


router.post('/api/v1/users/login', async (req, res) => {

    let db

    let connectionString = process.env.MONGODB_PATH

    mongodb.connect(
        connectionString,
        { useNewUrlParser: true, useUnifiedTopology: true },
        async function (err, client) {
            db = client.db()
            console.log(req.body.email, req.body.password)
            try {
                const user = await User.findByCredentials(req.body.email, req.body.password)
                if (user) {
                    const token = Math.floor(Math.random() * (999999 - 100000)) + 100000
                    db.collection('token').insertOne({ token: token })
                    console.log('ok', token)
                    res.status(200).send({ status: true, user, token })
                } else {
                    throw new Error("Credenciales invalidas")
                }

            } catch (error) {
                console.log(error)
                res.status(400).send({ error: "Credenciales invalidas" })
            }


        })

})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send('Ha cerrado sesión')
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('Ha cerrado sesión de todas sus cuentas')
    } catch (e) {
        res.status(500).send()
    }
})


// AUTH VERIFICATION
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['nombre', 'email', 'password', 'celular', 'url']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'No se puede realizar la actualizacion de datos de esos campos' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/check-token', async (req, res) => {
    const token = req.body.token
    try {
        let db

        let connectionString = process.env.MONGODB_PATH

        await mongodb.connect(
            connectionString,
            { useNewUrlParser: true, useUnifiedTopology: true },
            async function (err, client) {
                db = client.db()
                console.log("PSPSPSPS", token)
                await db.collection('token').find({ "token": Number(token) }).toArray(function (err, result) {
                    console.log("ERERERERER", err, result)
                    if (result != null && result.length > 0) {
                        res.send({ status: true })
                    } else {
                        res.send({ status: false })
                    }
                })

            })
    } catch (e) {
        console.log(e)
        res.send({ status: false })
    }
})


module.exports = router