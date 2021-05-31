const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Criando o Schema do Grupo
const GrupoSchema = mongoose.Schema({
    nome: {type: String, unique: true},
    
    status: {type: String, enum: ['ativo', 'inativo']}, 
    foto: {
        originalname: {type: String}, path: {type: String},
        size: {type: String}, mimetype: {type: String}
    },
    faixaPreco: {type: String, enum:['flex', 'economico']},
    cor: {type: String , unique:true}
}, {timestamps:true})
module.exports = mongoose.model('grupo', GrupoSchema)