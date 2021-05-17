const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Grupos = require('../model/Grupos')

/********************************************
 * Listar todos os grupos
 * GET /grupos
*********************************************/
router.get('/', async(req, res)=> {
    try{
        const grupos = await Grupos
        .find({"status": "ativo"})
        .sort({nome: 1})
        .populate("categoria", "nome")
        res.json(grupos)
    }catch (err) {
        res.status(500).send({
            errors: [{message: 'Não foi possível obter os grupos!'}]
        })
    }
}) 

/********************************************
 * Lista um grupo pelo id
 * GET /grupos/:id
*********************************************/
router.get('/:id', async(req, res)=> {
    try{
        const grupos = await Grupos.findById(req.params.id)
        res.json(grupos)
    } catch(err){
        res.status(500).send({
            errors: [{message: `Não foi possível obter o grupo com o id ${req.params.id}`}]
        })
    }
})





module.exports = router