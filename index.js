const express = require('express')
require('dotenv').config() //Carregamento das 'variaveis de ambientes'
const app = express()
//PORTA DEFAULT 
const PORT = process.env.PORT
//Parse conteudo JSON
app.use(express.json())

app.get('/', (req, res) =>{
    const idiomas = req.headers['accept-language']
    res.json({mensagem: "API LocaCar 100% funcional!!🤙 ",
            versao: '1.0.0'})
})

app.listen(PORT, (req, res) =>{
    console.log(`Servidor Web iniciado na porta ${PORT}`)
})