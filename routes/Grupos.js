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

/********************************************
 * Lista um grupo pelo id da Categoria
 * GET /grupos/categoria/:id
*********************************************/
router.get('/categoria/:id', async(req, res)=>{
    try{
        const grupos = await Grupos
        .find({"categoria": req.params.id})
        .sort({nome: 1})
        .populate("categorias", "nome")
    res.json(grupos)
    }catch(err) {
        res.status(500).send({
            errors: [{message: `Não foi possível obter o grupo com o id da categoria ${req.params.id}`}]
        })
    }
})

/********************************************
 * Incluir um novo grupo
 * POST /grupos
*********************************************/
const validarGrupo = [
    check('nome')
    .not().isEmpty().withMessage('Nome do grupo é obrigatório!'),
    check('status', 'Informe um status válido para o grupo.').isIn(['ativo', 'inativo']),
    check('categoria')
    .isMongoId().trim().withMessage('A categoria do grupo é inválida'),
    check('valor').isFloat({min: 100, max: 999}),
    check('arcond')
    .not().isEmpty().withMessage('Este campo é obrigatório').isIn(['sim', 'não'])
]

router.post('/', validarGrupo, async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
//Verificação se o grupo já existe
    const { nome } = req.body
    let grupos = await Grupos.findOne({nome})
    if(grupos)
        return res.status(200).json({
            errors: [{message: 'Já existe um grupo com o nome informado'}]
        })
    try{
        let grupo = new Grupos(req.body)
        await grupo.save()
        res.send(grupo)
    }catch (err){
        return res.status(500).json({
            errors: [{message: `Erro ao salvar o grupo: ${err.message}`}]
        })
    }
})

/********************************************
 * Remove um grupo
 * DELETE /grupos/:id
*********************************************/
router.delete('/:id', async(req, res)=>{
    await Grupo.findByIdAndRemove(req.params.id)
    .then(grupo =>{
        res.send({message: `Grupo ${grupo.nome} removido com sucesso!`})
    }).catch(err =>{
        return res.status(500).send({
            errors: [{message: `Não foi possível apagar o grupo com o id ${req.params.id}`}]
        })
    })
})

/********************************************
 * Edita um grupo
 * PUT /grupos
*********************************************/
router.put('/', validarGrupo, async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Grupo.findByIdAndUpdate(req.body._id, {
        $set: dados
    }, {new: true})
    .then(grupo =>{
        res.send({message: `Grupo ${grupo.nome} alterado com sucesso!`})
    }).catch(err => {
        return res.status(500).send({
            errors: [{message: 
           `Não foi possível alterar o grupo com o id ${req.body._id}`}]
        })
    })
})


module.exports = router