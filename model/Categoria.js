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
    }
}, {timestamp: true})

module.exports = mongoose.model('categoria', CategoriaSchema)