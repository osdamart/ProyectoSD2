const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const Task = require('./task')

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('contraseña')) {
                throw new Error('La contraseña no puede tener "contraseña" dentro')
            }
        }
    },
    /* fechaNacimiento: {
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 10,
    }, */
    celular: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
        trim: true,
    },
    url: {
        type: String,
        //required: true,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

/* userSchema.virtual('carreras', {
    ref: 'Carrera',
    localField: '_id',
    foreignField: 'cliente'
}) */

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'gogirltoken')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('No existe el usuario')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error('Contraseña incorrecta')
        }

        return user

    } catch (error) {
        return null
    }

}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user tasks when user is removed
/* userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
}) */

const User = mongoose.model('User', userSchema)

module.exports = User