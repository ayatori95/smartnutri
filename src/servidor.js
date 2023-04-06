const porta = 3003

const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const bancoDeDados = require('./bancoDeDados')

app.use(bodyParse.urlencoded({extended:true}))

app.get('/usuarios', (req, res,next) => { // caso utilizar use no lugar de get, qualquer url irá responder a requisição
    res.send(bancoDeDados.getUsuarios()) //Converte para JSON
})

app.get('/usuarios/:id', (req,res, next) => {
    res.send(bancoDeDados.getUsuario(req.params.id))
})

app.post('/usuarios', (req, res, next) => {
    const usuarios = bancoDeDados.salvarUsuario({
        nome: req.body.nome,
        idade: req.body.idade,
        genero: req.body.genero,
        altura: req.body.altura,
        peso: req.body.peso,
        restricao: req.body.restricao,
        objetivo: req.body.objetivo
        
    })
    res.send(usuarios) // JSON
})


app.listen(porta, () =>{
    console.log(`Servidor execultando na porta ${porta}`)
})