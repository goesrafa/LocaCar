 const mongoose = require('mongoose')

//Criação do Schema categoria
const CategoriaSchema = mongoose.Schema({
    nome:{
        type: String,
        unique: true //Indice unico criado
    },
    status:{
        type: String,
        enum: ['ativo', 'inativo'],
        default: 'ativo'
    },
    foto:{
        originalname: {type: String},
        path: {type: String},
        size: {type: Number},
        mimetype: {type: String}
    }
}, {timestamp: true})

module.exports = mongoose.model('categoria', CategoriaSchema)