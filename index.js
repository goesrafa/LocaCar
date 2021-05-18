const express = require('express')
require('dotenv').config() //Carregamento das 'variaveis de ambientes'
const InicializaMongoServer = require('./config/Db')
//Definição das rotas da aplicação
const rotasCategoria = require('./routes/Categoria')
const rotasGrupo = require('./routes/Grupos')


//Inicializando o servidor MongoDB
InicializaMongoServer()

const app = express()
//Removendo por segurança
app.disable('x-powered-by')
//PORTA DEFAULT 
const PORT = process.env.PORT

//Parse conteudo JSON
app.use(express.json())

app.get('/', (req, res) =>{
    res.json({mensagem: "API LocaCar 100% funcional!!🤙 ",
            versao: '1.0.0'})
})
/*Rotas da Categoria */
app.use('/categorias', rotasCategoria)
app.use('/grupos', rotasGrupo)

app.listen(PORT, (req, res) =>{
    console.log(`💻Servidor Web iniciado na porta ${PORT}`)
})