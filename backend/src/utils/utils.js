const mongodb = require('mongodb')

module.exports = {
    checkToken: async function (token) {
        try {
            let db

            let connectionString = process.env.MONGODB_PATH

            const client = await mongodb.connect(
                connectionString,
                { useNewUrlParser: true, useUnifiedTopology: true })

            db = client.db()
            console.log("token recibido", token)
            const result = await db.collection('token').find({ "token": Number(token) }).toArray()

            console.log("resultado de base", result)
            console.log((result != null && result.length > 0))
            if (result != null && result.length > 0) {
                return true
            } else {
                return false
            }

        } catch (e) {
            console.log(e)
            return false
        }
    }
}