const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Criando o Schema do Grupo
const GrupoSchema = mongoose.Schema({
    nome: {type: String, unique: true},
    categoria:{type: Schema.Types.ObjectId, ref: 'categoria'},
    status: {type: String, enum: ['ativo', 'inativo']}, 
    foto: {
        originalname: {type: String}, path: {type: String},
        size: {type: String}, mimetype: {type: String}
    },
    valor: {type:Number},
    arcondicionado: {type:String, enum: ['sim', 'não'], default: 'sim'},
}, {timestamps:true})
module.exports = mongoose.model('grupo', GrupoSchema)