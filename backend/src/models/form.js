var mongoose = require('mongoose');

const formSchema = new mongoose.Schema({//falta tipo voluntario y... preguntar a la miss y también los archivos
    nombre:{
        type: String
    },
    direccion:{
        type: String
    },
    email:{
        type: String
    },
    telefono:{
        type: String
    },
    edad:{
        type: Number
    },
    tipo:{
        type:String
    },
    inscripcion:{
        type:String
    },
    cedula:{
        type:String
    },
    estado:{
        type:String
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('formulario', formSchema);