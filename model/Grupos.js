const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Criando o Schema do Grupo
const GrupoSchema = mongoose.Schema({
    nome: {type: String, unique: true},
    status: {type: String, enum: ['ativo', 'inativo']},
    foto: {
        originalmente: {type:String},
        path: {type: String},
        size: {type: Number},
        mimetype: {type: String}
    },
    notaMedia: {type:Number},
    categoria: {type:Schema.Types.ObjectId, ref: 'categoria'},
    faixaPreco: {type:String, enum:['economico', 'medio', 'luxo' ]},
    tempoReserva: {type:String},
    retirada:{
        municipio:{type:String},
        estado: {type:String},
        dataRetirada: {type:String},
        horarioRetirada: {type: Number}
    },
    geolocalizacao: {
        latitude: {type:Number},
        longitude: {type:Number}
    }
}, {timestamps:true})
module.exports = mongoose.model('grupo', GrupoSchema)