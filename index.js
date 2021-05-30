const express = require('express')
require('dotenv').config() //Carregamento das 'variaveis de ambientes'
const InicializaMongoServer = require('./config/Db')
//Definição das rotas da aplicação
const rotasCategoria = require('./routes/Categoria')
const rotasGrupo = require('./routes/Grupos')
const rotaUpload = require('./routes/Upload')


//Inicializando o servidor MongoDB
InicializaMongoServer()

const app = express()
//Removendo por segurança
app.disable('x-powered-by')



//Middleware Express
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    //Cabeçalhos permitidos
    res.setHeader('Access-Control-Allow-Headers', '*')
    //ex: res.setHeader('Acess-Control-Allow-Headers', 'Content-Type, Accept, access-token')
    //Metodos permitido
    res.setHeader('Access-Control-Allow-methods', 'GET, POST, DELETE, OPTIONS, PATCH')
    next()
})

//PORTA DEFAULT 
const PORT = process.env.PORT

//Parse conteudo JSON
app.use(express.json())

app.get('/', (req, res) =>{
    res.json({mensagem: "API LocaCar 100% funcional!!🤙 ",
            versao: '1.0.8'})
})
/*Rotas da Categoria */
app.use('/categorias', rotasCategoria)
app.use('/grupos', rotasGrupo)
/*Rotas do conteúdo publico */
app.use('/public', express.static('public'))
/* Rotas upload */
app.use('/upload', rotaUpload)

/*Rota que trata exceções - 404 */
app.use(function(req, res){
    res.status(404).json({message: `A rota ${req.originalUrl} não existe!!`})
})

app.listen(PORT, (req, res) =>{
    console.log(`💻Servidor Web iniciado na porta ${PORT}`)
})